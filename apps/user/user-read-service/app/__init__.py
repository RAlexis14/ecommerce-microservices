from flask import Flask
from flask_cors import CORS
from flasgger import Swagger

def create_app():
    """Initialize the Flask app with CORS and Swagger."""
    app = Flask(__name__)
    CORS(app)
    Swagger(app)
    app.config.from_pyfile("../config.py")

    from app.routes import bp
    app.register_blueprint(bp)
    return app
