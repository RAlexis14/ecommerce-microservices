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

@bp.route('/users/<int:user_id>', methods=['PUT'])
@swag_from({
    'tags': ['Users'],
    'parameters': [
        {
            'name': 'user_id',
            'in': 'path',
            'required': True,
            'type': 'integer'
        },
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
                }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'User updated successfully.'
        },
        404: {
            'description': 'User not found.'
        }
    }
})
def update_user(user_id):
    """Update user details."""
    data = request.json
    fields = []
    values = []

    if 'name' in data:
        fields.append("name = %s")
        values.append(data['name'])
    if 'email' in data:
        fields.append("email = %s")
        values.append(data['email'])
    if 'password' in data:
        fields.append("password = %s")
        values.append(data['password'])

    if not fields:
        return jsonify({'error': 'No valid fields to update'}), 400

    values.append(user_id)

    connection = get_db_connection()
    with connection:
        with connection.cursor() as cursor:
            sql = f"UPDATE users SET {', '.join(fields)} WHERE id = %s"
            cursor.execute(sql, tuple(values))
        connection.commit()

    return jsonify({'message': 'User updated'}), 200
