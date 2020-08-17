from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from datetime import datetime, timedelta
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Date, Float
from airflow.utils.dates import days_ago
import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import pandas as pd


engine = create_engine('mysql+pymysql://root:ngph@172.17.0.2:3306/m2')
Session = sessionmaker(bind=engine)
session = Session() 
Base = declarative_base()

class Bank(Base):
    __tablename__ = 'bank'
    id = Column('id', String(10), primary_key=True)
    bank_success = relationship('BankSuccess')

class BankSuccess(Base):
    __tablename__ = 'bank_success'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    bank_code = Column('bank_code', String(10), ForeignKey('bank.id'))
    recorded_date = Column('recorded_date', Date, default=None)
    success_trans = Column('success_trans', Integer, default=0)
    total_trans = Column('total_trans', Integer, default=0)
    success_rate = Column('success_rate', Float, default=0)

def bank_success(date):
    df = pd.read_sql(f"select * from transaction where req_date like '{date}' and bank_code not like ''", con=engine)
    bank_success = df.loc[~df['type'].isin([1,2,3,4])]
    bank_success = bank_success.groupby(['bank_code', 'req_date']).agg({
        'trans_status': 'sum',
        'trans_id': 'count'
    })

    bank_success.columns = ['success_trans', 'total_trans']
    bank_success['success_rate'] = bank_success['success_trans'] / bank_success['total_trans']
    bs_ri = bank_success.reset_index()
    
    return bs_ri.values
    
def insert_bank(session,allBanks):
    for b in allBanks:
        newBank = BankSuccess()
        newBank.bank_code = b[0]
        newBank.recorded_date = b[1]
        newBank.success_trans = b[2]
        newBank.total_trans = b[3]
        newBank.success_rate = b[4]
        session.add(newBank)

    session.commit()

session.close()


default_args = {
    "owner": "airflow",
    "start_date": datetime.datetime(2018, 12, 1),
    "end_date": datetime.datetime(2018, 12, 31),
    "retries": 1,
    "retry_delay": timedelta(minutes=5)
}

dag = DAG("bank_success", default_args=default_args, schedule_interval='@daily')

def query_df(**context):
    bs = bank_success(context['ds'])
    context['ti'].xcom_push(key='pusher1', value=bs)

def say_hi(**context):
    ti = context['ti']

    bs = ti.xcom_pull(key=None, task_ids='query')
    insert_bank(session, bs)

# t1, t2 and t3 are examples of tasks created by instantiating operators
with dag:

    t1 = PythonOperator(task_id="query", provide_context=True,python_callable=query_df)

    t2 = PythonOperator(task_id="get", provide_context=True,python_callable=say_hi)

t1 >> t2
