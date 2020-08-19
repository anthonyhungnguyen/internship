from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Date, Float
import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from utilities import *

Base = declarative_base()

# WORK
# engine = create_engine('mysql+pymysql://ngph:Hung8787@localhost/m2', echo=True)

# HOME
engine = create_engine('mysql+pymysql://root:ngph@localhost:3306/m2')


class User(Base):
    __tablename__ = 'user'
    id = Column('id', String(32), primary_key=True)
    user_rfm = relationship('UserRFM')
    transactions = relationship('Transaction')
    userpayapp = relationship('UserPayApp')


class Bank(Base):
    __tablename__ = 'bank'
    id = Column('id', String(10), primary_key=True)
    bank_success = relationship('BankSuccess')


class UserRFM(Base):
    __tablename__ = 'user_rfm'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    user_id = Column('user_id', String(32), ForeignKey('user.id'))
    recorded_date = Column('recorded_date', Date,
                           default=datetime.datetime.now().date)
    recency = Column('recency', Integer, default=None)
    frequency = Column('frequency', Integer, default=0)
    monetary = Column('monetary', Float, default=0)
    r_score = Column('r_score', Integer, default=None)
    f_score = Column('f_score', Integer, default=0)
    m_score = Column('m_score', Integer, default=None)
    rfm_score = Column('rfm_score', String(3), default=None)


class BankSuccess(Base):
    __tablename__ = 'bank_success'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    bank_code = Column('bank_code', String(10), ForeignKey('bank.id'))
    recorded_date = Column('recorded_date', Date, default=None)
    success_trans = Column('success_trans', Integer, default=0)
    total_trans = Column('total_trans', Integer, default=0)
    success_rate = Column('success_rate', Float, default=0)


class Transaction(Base):
    __tablename__ = 'transaction'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    user_id = Column('user_id', String(
        32), ForeignKey('user.id'), nullable=False)
    req_date = Column('req_date', Date, nullable=False)
    trans_id = Column('trans_id', String(32), nullable=False)
    bank_code = Column('bank_code', String(
        10), ForeignKey('bank.id'))
    amount = Column('amount', Float, nullable=False)
    trans_status = Column('trans_status', Integer, nullable=False)
    type = Column('type', Integer, nullable=False)


class UserPayApp(Base):
    __tablename__ = 'user_pay_app'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    user_id = Column('user_id', String(32), ForeignKey(
        'user.id'), nullable=False)
    app_id = Column('app_id', Integer, nullable=False)
    total_amount = Column('total_amount', Float)


class UserTransfer(Base):
    __tablename__ = 'user_transfer'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    sender = Column('sender', String(
        32), ForeignKey("user.id"), nullable=False)
    receiver = Column('receiver', String(
        32), ForeignKey('user.id'), nullable=False)
    trans_id = Column('trans_id', String(20), nullable=False)
    req_date = Column('req_date', Date, nullable=False)
    amount = Column('amount', Float)
    sender_f = relationship("User", foreign_keys=[sender])
    receiver_f = relationship("User", foreign_keys=[receiver])


# def insert_users(session):
#     all_users = return_users()
#     for u in all_users:
#         new_user = User()
#         new_user.id = u
#         session.add(new_user)


# def insert_banks(session):
#     all_banks = return_banks()
#     for b in all_banks:
#         new_b = Bank()
#         new_b.id = b
#         session.add(new_b)


# def insert_users(session):
#     allUsers = return_users_rfm()
#     for u in allUsers:
#         new_user = UserRFM()
#         new_user.user_id = u[0]
#         new_user.recency = u[1]
#         new_user.frequency = u[2]
#         new_user.monetary = u[3]
#         new_user.r_score = u[4]
#         new_user.f_score = u[5]
#         new_user.m_score = u[6]
#         new_user.rfm_score = u[7]
#         session.add(new_user)


# def insert_userpayapp(session):
#     userPayApp = return_user_pay_app()
#     for upa in userPayApp:
#         new_upa = UserPayApp()
#         new_upa.user_id = upa[0]
#         new_upa.app_id = upa[1]
#         new_upa.total_amount = upa[2]
#         session.add(new_upa)


def insert_usertransfer(session):
    userTransfer = return_usertransfer()
    for ut in userTransfer:
        new_ut = UserTransfer()
        new_ut.sender = ut[0]
        new_ut.receiver = ut[1]
        new_ut.trans_id = ut[2]
        new_ut.req_date = ut[3]
        new_ut.amount = ut[4]
        session.add(new_ut)


Base.metadata.create_all(bind=engine)
Session = sessionmaker(bind=engine)

session = Session()
# insert_users(session)
# insert_banks(session)
# insert_users(session)
# insert_userpayapp(session)
insert_usertransfer(session)
session.commit()
session.close()
