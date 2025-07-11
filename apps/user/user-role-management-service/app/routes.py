from flask import Blueprint, request, jsonify
from flasgger.utils import swag_from
import pymysql
from config import MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB

bp = Blueprint("routes", __name__)

def get_db_connection():
    return pymysql.connect(
        host=MYSQL_HOST,
        port=MYSQL_PORT,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_DB,
        cursorclass=pymysql.cursors.DictCursor
    )

@bp.route("/roles", methods=["POST"])
@swag_from({
    'tags': ['Roles'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'user_id': {'type': 'integer'},
                    'role': {'type': 'string'}
                },
                'required': ['user_id', 'role']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Role assigned successfully.'
        }
    }
})
def assign_role():
    data = request.json
    connection = get_db_connection()
    with connection:
        with connection.cursor() as cursor:
            sql = "INSERT INTO user_roles (user_id, role) VALUES (%s, %s)"
            cursor.execute(sql, (data['user_id'], data['role']))
        connection.commit()
    return jsonify({'message': 'Role assigned'}), 201

@bp.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200
