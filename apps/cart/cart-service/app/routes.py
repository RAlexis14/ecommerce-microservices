from flask import Blueprint, request, jsonify
from app_config import MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB
import pymysql
from flasgger.utils import swag_from

bp = Blueprint('cart', __name__)

def get_db_connection():
    return pymysql.connect(
        host=MYSQL_HOST,
        port=MYSQL_PORT,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_DB,
        cursorclass=pymysql.cursors.DictCursor
    )

@bp.route('/cart', methods=['POST'])
@swag_from({
    'tags': ['Cart'],
    'consumes': ['application/json'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'user_id': {'type': 'integer'},
                    'product_id': {'type': 'integer'},
                    'quantity': {'type': 'integer'}
                },
                'required': ['user_id', 'product_id', 'quantity']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Item added to cart'
        }
    }
})

def add_to_cart():
    data = request.json
    conn = get_db_connection()
    with conn:
        with conn.cursor() as cursor:
            sql = "INSERT INTO cart (user_id, product_id, quantity) VALUES (%s, %s, %s)"
            cursor.execute(sql, (data['user_id'], data['product_id'], data['quantity']))
        conn.commit()
    return jsonify({'message': 'Item added to cart'}), 201

@bp.route('/cart/<int:user_id>', methods=['GET'])
@swag_from({
    'tags': ['Cart'],
    'parameters': [
        {
            'name': 'user_id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the user'
        }
    ],
    'responses': {
        200: {
            'description': 'Cart items for user',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'user_id': {'type': 'integer'},
                        'product_id': {'type': 'integer'},
                        'quantity': {'type': 'integer'}
                    }
                }
            }
        }
    }
})
def get_cart(user_id):
    conn = get_db_connection()
    with conn:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM cart WHERE user_id = %s", (user_id,))
            result = cursor.fetchall()
    return jsonify(result), 200

@bp.route('/cart/<int:user_id>', methods=['DELETE'])
@swag_from({
    'tags': ['Cart'],
    'parameters': [
        {
            'name': 'user_id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the user'
        }
    ],
    'responses': {
        200: {'description': 'Cart cleared'}
    }
})
def clear_cart(user_id):
    conn = get_db_connection()
    with conn:
        with conn.cursor() as cursor:
            cursor.execute("DELETE FROM cart WHERE user_id = %s", (user_id,))
        conn.commit()
    return jsonify({'message': 'Cart cleared'}), 200

@bp.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200
