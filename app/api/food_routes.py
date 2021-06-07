from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Food, db , FoodEntry

food_routes = Blueprint('foods', __name__)

@food_routes.route('/')
@login_required
def get_foods():
    foods = Food.query.all()
    return jsonify([food.to_dict() for food in foods])

@food_routes.route('/entry', methods =['POST'])
@login_required
def create_entry():
    data = request.json
    print(data)
    print('======================')
    newFood = FoodEntry(
        food_id = data["foodId"],
        diary_id = data["diaryId"],
        mealType = data["mealType"],
        totalCalories = data["totalCalories"]
    )

    db.session.add(newFood)
    db.session.commit()
    return newFood.to_dict()
