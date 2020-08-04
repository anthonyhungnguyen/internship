from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Date, Float
import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from utilities import *

Base = declarative_base()

engine = create_engine('mysql+pymysql://ngph:Hung8787@localhost/m2', echo=True)

class User(Base):
    __tablename__ = 'user'

    userId = Column('userID', String(32), primary_key=True)
    userRecency = Column('userRecency', Date)
    userFrequency = Column('userFrequency', Integer, default=0)
    userMonetary = Column('userMonetary', Float, default=0)
    transactions = relationship('Transaction')
    userpayapp = relationship('UserPayApp')


class Bank(Base):
    __tablename__ = 'bank'

    bankCode = Column('bankCode', String(10), primary_key=True)
    recordedDate = Column('date', Date, primary_key=True, )
    successTrans = Column('successTrans', Integer, default=0)
    totalTrans = Column('totalTrans', Integer, default=0)
    transactions = relationship('Transaction')

class Transaction(Base):
    __tablename__ = 'transaction'

    transID = Column('transID', String(32), primary_key=True)
    userID = Column('userID', String(32), ForeignKey('user.userID'))
    reqDate = Column('reqDate', Date, nullable=False)
    bankCode = Column('bankCode', ForeignKey('bank.bankCode'))
    amount = Column('amount', Float, nullable=False)
    transStatus = Column('transStatus', Integer, nullable=False)
    type = Column('type', Integer, nullable=False)



class UserPayApp(Base):
    __tablename__ = 'user_pay_app'

    userID = Column('userID', String(32), ForeignKey('user.userID'), primary_key=True)
    appID = Column('appID', Integer, primary_key=True)
    totalAmount = Column('totalAmount', Float)

def insert_users(session):
    all_users = return_users()
    for u in all_users:
        new_user = User()
        new_user.userId = u
        session.add(new_user)
    session.commit()

def insert_bank(session):
    all_banks = return_banks()
    for b in all_banks:
        new_bank = Bank()
        new_bank.bankCode = b[0]
        new_bank.recordedDate = b[1]
        new_bank.successTrans = b[2]
        new_bank.totalTrans = b[3]
        session.add(new_bank)
    session.commit()

# Base.metadata.create_all(bind=engine)
Session = sessionmaker(bind=engine)

session = Session()

# insert_users(session)
insert_bank(session)

# users = session.query(User).all()
# for user in users:
#     print(user.id)
# session.commit()
session.close()