from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Food, db

food_routes = Blueprint('foods', __name__)

@food_routes.route('/')
@login_required
def get_foods():
    foods = Food.query.all()
    return jsonify([food.to_dict() for food in foods])