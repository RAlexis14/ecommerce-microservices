from flask import Flask
from flask_cors import CORS
from flasgger import Swagger
from app.routes import bp

def create_app():
    app = Flask(__name__)
    CORS(app)
    Swagger(app)
    app.register_blueprint(bp)
    return app
