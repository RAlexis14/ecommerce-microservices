# app/routes.py
from config import MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB

from flask import Blueprint, jsonify, request
from flasgger.utils import swag_from
import pymysql

bp = Blueprint('routes', __name__)

def get_db_connection():
    return pymysql.connect(
        host=MYSQL_HOST,
        port=MYSQL_PORT,  
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_DB,
        cursorclass=pymysql.cursors.DictCursor
    )

@bp.route('/users', methods=['POST'])
@swag_from({
    'tags': ['Users'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string'},
                    'email': {'type': 'string'},
                    'password': {'type': 'string'}
                },
                'required': ['name', 'email', 'password']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'User created successfully.'
        }
    }
})
def create_user():
    """Create a new user and save to MySQL database."""
    data = request.json
    connection = get_db_connection()
    with connection:
        with connection.cursor() as cursor:
            sql = "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)"
            cursor.execute(sql, (data['name'], data['email'], data['password']))
        connection.commit()
    return jsonify({'message': 'User created'}), 201

@bp.route('/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({'status': 'ok'}), 200
