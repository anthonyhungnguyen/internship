import pandas as pd
import datetime
from datetime import timedelta
import numpy as np

df = pd.read_csv('./vtf2020_module2_data.csv')
df['reqDate'] = df['reqDate'].apply(
    lambda x: datetime.datetime.strptime(x, '%Y-%m-%d %H:%M:%S.%f').date())


def return_users():
    return df['userID'].unique()


def return_banks():
    return df['bankCode'].dropna().unique()


def return_users_rfm():
    max_date = max(df['reqDate'])
    rfm = df.groupby(['userID']).agg({
        'reqDate': lambda x: (max_date + timedelta(1) - x.max()).days,
        'transID': 'count',
        'amount': 'sum'
    })
    rfm.columns = ['recency', 'frequency', 'monetary']
    rfm['r-score'] = pd.qcut(rfm['recency'], q=4, labels=range(4, 0, -1))
    rfm['f-score'] = pd.qcut(rfm['frequency'], q=4, labels=range(1, 5, 1))
    rfm['m-score'] = pd.qcut(rfm['monetary'], q=4, labels=range(1, 5, 1))
    rfm.reset_index(inplace=True)
    return rfm.values


def return_banks_success_rate():
    bank_success = df.groupby(['bankCode', 'reqDate']).agg({
        'transStatus': 'sum',
        'transID': 'count'
    })

    bank_success.columns = ['successTransactions', 'totalTransactions']
    bank_success['SuccessRate'] = bank_success['successTransactions'] / \
        bank_success['totalTransactions']
    return bank_success.reset_index().values


def return_rfm():
    appid = df.loc[~df['type'].isin([1, 2, 3, 4])]
    appid = appid.groupby(['userID', 'type']).agg({
        'amount': 'sum'
    })
    appid.reset_index(inplace=True)
    return appid.values


def return_transactions():
    return df.values
