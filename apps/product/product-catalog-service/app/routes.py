from flask import Blueprint, jsonify, request
from config import MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB
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

@bp.route('/products/create', methods=['POST'])  
@swag_from({
    'tags': ['Products'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                 'type': 'object',
                 'properties': {
                        'name': {'type': 'string'},
                        'description': {'type': 'string'},
                        'price': {'type': 'number'},
                        'stock': {'type': 'integer'}
                 },
                'required': ['name', 'price', 'stock']
            }
         }
    ],
    'responses': {
        201: {
            'description': 'Product created successfully'
        }
    }
})
def create_product():
    data = request.json
    conn = get_db_connection()
    with conn:
        with conn.cursor() as cursor:
            sql = "INSERT INTO products (name, description, price, stock) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (data['name'], data.get('description'), data['price'], data['stock']))
        conn.commit()
    return jsonify({'message': 'Product created'}), 201


@bp.route('/products/list/<int:product_id>', methods=['GET'])     
def get_products():
    conn = get_db_connection()
    with conn:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM products")
            result = cursor.fetchall()
    return jsonify(result), 200

@bp.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200
