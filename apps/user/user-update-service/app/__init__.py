from flask import Flask
from flask_cors import CORS
from flasgger import Swagger

def create_app():
    app = Flask(__name__)
    CORS(app)
    Swagger(app)

    from app.routes import bp
    app.register_blueprint(bp)

    return app
