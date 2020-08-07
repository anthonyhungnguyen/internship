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

class User(Base):
    __tablename__ = 'user'
    id = Column('id', String(32), primary_key=True)
    user_rfm = relationship('UserRFM')

class UserRFM(Base):
    __tablename__ = 'user_rfm'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    user_id = Column('user_id', String(32), ForeignKey('user.id'))
    recorded_date = Column('recorded_date', Date,
                           default=datetime.datetime.now().date)
    recency = Column('recency', Integer, default=None)
    frequency = Column('frequency', Integer, default=0)
    monetary = Column('monetary', Float, default=0)

def calc_rfm(date):
    rfm = pd.read_sql(f"select * from transaction where req_date <= '{date}'", con=engine)
    max_date = max(rfm['req_date'])
    rfm = rfm.groupby(['user_id']).agg({
        'req_date': lambda x: (max_date + timedelta(1) - x.max()).days,
        'trans_id': 'count',
        'amount': 'sum'
    })
    rfm.columns = ['recency', 'frequency', 'monetary']
    rfm['r_score'] = pd.qcut(rfm['recency'], q=5, labels=[4,3,2,1], duplicates='drop')
    rfm['f_score'] = pd.qcut(rfm['frequency'], q=5, labels=[1,2,3,4], duplicates='drop')
    rfm['m_score'] = pd.qcut(rfm['monetary'], q=4, labels=[1,2,3,4], duplicates='drop')
    rfm['rfm_score'] = rfm['r-score'].astype(str) + rfm['f-score'].astype(str) + rfm['m-score'].astype(str)
    return rfm.values()

def insert(date):
    print('hello')


default_args = {
    "owner": "airflow",
    "start_date": datetime.datetime(2018, 12, 1),
    "end_date": datetime.datetime(2018, 12, 31),
    "retries": 1,
    "retry_delay": timedelta(minutes=5)
}

dag = DAG("rfm", default_args=default_args, schedule_interval='@weekly')

def query_df(**context):
    print(context['ds'])
    rfm = calc_rfm(context['ds'])
    context['ti'].xcom_push(key='pusher1', value=rfm)

def insert(**context):
    ti = context['ti']

    mess = ti.xcom_pull(key=None, task_ids='query')
    print(mess)
# t1, t2 and t3 are examples of tasks created by instantiating operators
with dag:

    t1 = PythonOperator(task_id="query", provide_context=True,python_callable=query_df)

    t2 = PythonOperator(task_id="get", provide_context=True,python_callable=insert)

t1 >> t2
