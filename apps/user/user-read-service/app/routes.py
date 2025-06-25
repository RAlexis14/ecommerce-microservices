from flask import Blueprint, jsonify, request
from flasgger.utils import swag_from
import pymysql
from config import MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB

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

@bp.route('/users/<int:user_id>', methods=['GET'])
@swag_from({
    'tags': ['Users'],
    'parameters': [
        {
            'name': 'user_id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the user to retrieve'
        }
    ],
    'responses': {
        200: {'description': 'User retrieved successfully'},
        404: {'description': 'User not found'}
    }
})
def get_user(user_id):
    """Retrieve user information from the database."""
    connection = get_db_connection()
    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT id, name, email FROM users WHERE id = %s"
            cursor.execute(sql, (user_id,))
            user = cursor.fetchone()
            if user:
                return jsonify(user), 200
            return jsonify({'error': 'User not found'}), 404

@bp.route('/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({'status': 'ok'}), 200
