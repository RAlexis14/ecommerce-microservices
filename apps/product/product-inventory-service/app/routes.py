from flask import Blueprint, jsonify, request
from app_config import MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB
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

@bp.route('/inventory', methods=['POST'])
@swag_from({
    'tags': ['Inventory'],
    'parameters': [{
        'name': 'body',
        'in': 'body',
        'required': True,
        'schema': {
            'type': 'object',
            'properties': {
                'product_id': {'type': 'integer'},
                'quantity': {'type': 'integer'}
            },
            'required': ['product_id', 'quantity']
        }
    }],
    'responses': {
        201: {'description': 'Inventory entry created successfully'}
    }
})
def add_inventory():
    data = request.json
    conn = get_db_connection()
    with conn:
        with conn.cursor() as cursor:
            sql = "INSERT INTO inventory (product_id, quantity) VALUES (%s, %s)"
            cursor.execute(sql, (data['product_id'], data['quantity']))
        conn.commit()
    return jsonify({'message': 'Inventory entry created'}), 201

@bp.route('/inventory', methods=['GET'])
@swag_from({
    'tags': ['Inventory'],
    'responses': {
        200: {
            'description': 'List of inventory entries',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'product_id': {'type': 'integer'},
                        'quantity': {'type': 'integer'}
                    }
                }
            }
        }
    }
})
def get_inventory():
    conn = get_db_connection()
    with conn:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM inventory")
            result = cursor.fetchall()
    return jsonify(result), 200

@bp.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200
