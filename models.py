from geoalchemy2 import Geometry
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import  Column, String, Integer

base = declarative_base() 

class Border(base):
    __tablename__ = 'border' 
    id = Column(Integer, primary_key = True)
    Nazwa = Column(String())
    TERYT = Column(String())
    geom = Column(Geometry('MULITPOLYGON',4326))
    __table_args__ = {'schema': 'dataapp'}

class Poly(base):
    __tablename__ = 'polygon' 
    id = Column(Integer, primary_key = True)
    fid = Column(String())
    emergency = Column(String())
    geom = Column(Geometry('MULITPOLYGON',4326))
    __table_args__ = {'schema': 'dataapp'}

class services(base):
    __tablename__ = 'force'
    id = Column(Integer, primary_key = True)
    geom = Column(Geometry('POINT',4326))
    fid = Column(String())
    emergency = Column(String())
    email = Column(String())
    website = Column(String())
    phone = Column(String())
    name = Column(String())
    addres = Column(String())
    __table_args__ = {'schema': 'dataapp'}