from sqlalchemy import text,func
import geoalchemy2.functions as geofunc
from models import  Border, services, Poly
import json
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI']="postgresql://postgres:geoinformacja@localhost:5432/Workshop"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# Warstwy
@app.route("/geojson-border", methods=['GET'])
def get_border():
    features = db.session.query(geofunc.ST_AsGeoJSON(Border)).all()   
    return ({
        "type": "FeatureCollection",
        "features": [json.loads(mytuple[0]) for mytuple in features] 
        })

@app.route("/geojson-poly", methods=['GET'])
def get_poly():
    features = db.session.query(geofunc.ST_AsGeoJSON(Poly)).all()   
    return ({
        "type": "FeatureCollection",
        "features": [json.loads(mytuple[0]) for mytuple in features] 
        })


@app.route("/geojson-services", methods =['GET'])
def get_services():
    features = db.session.query(geofunc.ST_AsGeoJSON(services)).all()
    return ({
        "type": "FeatureCollection",
        "features": [json.loads(mytuple[0]) for mytuple in features] 
       })


#Strona
@app.route('/')
def main():
    return render_template('index.html')

################  funkcja trasa

@app.route("/geojson-dijkstra", methods=['GET'])
def handle_dijkstra():
  
        x1 = request.args.get('x1')
        y1 = request.args.get('y1')
        x2 = request.args.get('x2')
        y2 = request.args.get('y2')

        query =   """ SELECT (SUM(cost) / 1000)::numeric(6,2) AS dlugosc_km, ST_AsGeoJSON(ST_MakeLine(route.geom)) AS geom
        FROM ( SELECT *  FROM dataapp.wrapxy_dijkstrawgs(:x1, :y1, :x2, :y2) 
        ORDER BY seq ) AS route """  
        
        result = db.session.execute(text(query), {'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2})     
        row = result.fetchone()    

        if row and row[1]:  
            response = {
                "type": "Feature",
                "properties": {"dlugosc_km": float(row[0])},              
                "geometry": json.loads(row[1])  
            }          
            return jsonify(response)    


#############################  funkcja izo ##################

@app.route("/geojson-alphashape", methods=['GET'])
def handle_alpha():
    x= request.args.get('x')
    y= request.args.get('y')
    dim=request.args.get('dim')
    features = db.session.query(geofunc.ST_AsGeoJSON(func.dataapp.alphashape(x,y,dim))).all()   
    return ({
        "type": "FeatureCollection",
        "features": [json.loads(mytuple[0]) for mytuple in features] 
        })
    
#############################  funkcja Trsp ##################
@app.route("/geojson-trsp", methods=["GET"])
def handle_trsp():

        x1 = request.args.get("x1")
        y1 = request.args.get("y1")
        x2 = request.args.get("x2")
        y2 = request.args.get("y2")
        x3 = request.args.get("x3")
        y3 = request.args.get("y3")
        Buffer = request.args.get("Buffer")

        features = db.session.query(geofunc.ST_AsGeoJSON(func.dataapp.create_trsp_comp3(x1,y1, x2, y2,  x3,  y3,Buffer))).all()     
        return {
            "type": "FeatureCollection",
            "features": [json.loads(mytuple[0]) for mytuple in features],
        }
    
if __name__ == '__main__':
   app.run(debug=True)
