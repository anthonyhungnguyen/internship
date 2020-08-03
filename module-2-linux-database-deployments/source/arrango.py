import pandas as pd
from pyArango.connection import *
from pyArango.collection import *
conn = Connection(arangoURL="http://172.25.16.205:8529", username="testuser@localhost", password="Hung8787")

df = pd.read_csv('../assets/data/transfer_network_201812.csv')
# df.to_json('./lala.json')
db = conn["testdb"]
col = db["sender"]


for v in df['sender']:
    data = col.createDocument()
    data._key = v
    data.save()