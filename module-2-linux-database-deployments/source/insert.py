from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Date, Float
import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from utilities import *

Base = declarative_base()

# WORK
# engine = create_engine('mysql+pymysql://ngph:Hung8787@localhost/m2', echo=True)

# HOME
engine = create_engine('mysql+pymysql://ngph:ngph@localhost/m2', echo=True)


class User(Base):
    __tablename__ = 'user'

    id = Column('id', String(32), primary_key=True)
    recorded_date = Column('recorded_date', Date,
                           primary_key=True, default=datetime.datetime.now().date)
    recency = Column('recency', Integer, default=None)
    frequency = Column('frequency', Integer, default=0)
    monetary = Column('monetary', Float, default=0)
    transactions = relationship('Transaction')
    userpayapp = relationship('UserPayApp')


class Bank(Base):
    __tablename__ = 'bank'

    bank_code = Column('bank_code', String(10), primary_key=True)
    recorded_date = Column('recorded_date', Date,
                           primary_key=True, default=None)
    success_trans = Column('success_trans', Integer, default=0)
    total_trans = Column('total_trans', Integer, default=0)
    transactions = relationship('Transaction')


class Transaction(Base):
    __tablename__ = 'transaction'

    id = Column('id', String(32), primary_key=True)
    user_id = Column('user_id', String(32), ForeignKey('user.id'))
    req_date = Column('req_date', Date, nullable=False)
    bank_code = Column('bank_code', ForeignKey('bank.bank_code'))
    amount = Column('amount', Float, nullable=False)
    trans_status = Column('trans_status', Integer, nullable=False)
    type = Column('type', Integer, nullable=False)


class UserPayApp(Base):
    __tablename__ = 'user_pay_app'

    user_id = Column('user_id', String(32), ForeignKey(
        'user.id'), primary_key=True)
    app_id = Column('app_id', Integer, primary_key=True)
    total_amount = Column('total_amount', Float)


def insert_users(session):
    allUsers = return_users()
    for u in allUsers:
        new_user = User()
        new_user.id = u[0]
        new_user.recency = u[1]
        new_user.frequency = u[2]
        new_user.monetary = u[3]
        session.add(new_user)


def insert_bank(session):
    allBanks = return_banks()
    for b in allBanks:
        newBank = Bank()
        newBank.bank_code = b[0]
        newBank.recorded_date = b[1]
        newBank.success_trans = b[2]
        newBank.total_trans = b[3]
        session.add(newBank)


def insert_userpayapp(session):
    userPayApp = return_rfm()
    for upa in userPayApp:
        new_upa = UserPayApp()
        new_upa.user_id = upa[0]
        new_upa.app_id = upa[1]
        new_upa.total_amount = upa[2]
        session.add(new_upa)


def insert_transactions(session):
    transactions = return_transactions()
    for t in transactions:
        new_t = Transaction()
        new_t.user_id = t[0]
        new_t.req_date = t[1]
        new_t.id = t[2]
        new_t.bank_code = t[3]
        new_t.amount = t[4]
        new_t.trans_status = t[5]
        new_t.type = t[6]
        session.add(new_t)


# Base.metadata.create_all(bind=engine)
Session = sessionmaker(bind=engine)

session = Session()

# insert_users(session)
# insert_bank(session)
# insert_userpayapp(session)
insert_transactions(session)

session.commit()
session.close()
