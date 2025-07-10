from config import MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB
from flask import Blueprint, request, jsonify
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

@bp.route('/users/<int:user_id>', methods=['DELETE'])
@swag_from({
    'tags': ['Users'],
    'parameters': [
        {
            'name': 'user_id',
            'in': 'path',
            'required': True,
            'type': 'integer'
        }
    ],
    'responses': {
        200: {
            'description': 'User deleted successfully.'
        },
        404: {
            'description': 'User not found.'
        }
    }
})
def delete_user(user_id):
    connection = get_db_connection()
    with connection:
        with connection.cursor() as cursor:
            sql = "DELETE FROM users WHERE id = %s"
            result = cursor.execute(sql, (user_id,))
        connection.commit()

    if result == 0:
        return jsonify({'message': 'User not found'}), 404
    return jsonify({'message': 'User deleted'}), 200
