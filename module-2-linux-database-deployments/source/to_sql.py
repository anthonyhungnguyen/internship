from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Date, Float
import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import pandas as pd

engine = create_engine('mysql+pymysql://ngph:ngph@localhost/m2', echo=True)

df = pd.read_csv('./vtf2020_module2_data.csv')
df['reqDate'] = df['reqDate'].apply(
    lambda x: datetime.datetime.strptime(x, '%Y-%m-%d %H:%M:%S.%f').date())
df_reset = df.reset_index()
df_reset.columns = ['id', 'user_id', 'req_date',
                    'trans_id', 'bank_code', 'amount', 'trans_status', 'type']
df_reset.to_sql('transfer.sql', engine)
