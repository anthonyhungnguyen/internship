import pandas as pd
import datetime
from datetime import timedelta
import numpy as np

df = pd.read_csv('./vtf2020_module2_data.csv')
df['reqDate'] = df['reqDate'].apply(lambda x: datetime.datetime.strptime(x, '%Y-%m-%d %H:%M:%S.%f').date())

def return_users():
    return df['userID'].unique()

def return_banks():
    sorted_date = sorted(df['reqDate'].unique())
    bank_success = df.groupby(['bankCode', 'reqDate']).agg({
        'transStatus': 'sum',
        'transID': 'count'
    })  

    bank_success.columns = ['successTransactions', 'totalTransactions']
    bank_success['SuccessRate'] = bank_success['successTransactions'] / bank_success['totalTransactions']
    return bank_success.reset_index().values