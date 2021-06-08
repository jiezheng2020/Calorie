from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Food, db , FoodEntry

food_routes = Blueprint('foods', __name__)

@food_routes.route('/')
@login_required
def get_foods():
    foods = Food.query.all()
    return jsonify([food.to_dict() for food in foods])

@food_routes.route('/', methods=['POST'])
@login_required
def create_custom():
    data = request.json
    newFood = Food(
        name=data["name"],
        calories=data["calories"],
        foodType= "custom",
        serving=data["serving"]
    )

    db.session.add(newFood)
    db.session.commit()

    return newFood.to_dict()

@food_routes.route('/entry', methods =['POST'])
@login_required
def create_entry():
    data = request.json

    newFood = FoodEntry(
        food_id = data["foodId"],
        diary_id = data["diaryId"],
        mealType = data["mealType"],
        totalCalories = data["totalCalories"]
    )

    db.session.add(newFood)
    db.session.commit()
    return newFood.to_dict()

@food_routes.route('/entry/<int:id>', methods =['PUT'])
@login_required
def edit_entry(id):
    data = request.json

    newFood = FoodEntry.query.get(id)
    newFood.totalCalories = data["totalCalories"]

    db.session.add(newFood)
    db.session.commit()
    return newFood.to_dict()

@food_routes.route('/entry/<int:id>', methods =['DELETE'])
@login_required
def delete_entry(id):
    entry = FoodEntry.query.get(id)

    db.session.delete(entry)
    db.session.commit()
    return {'message': 'deleted!'}
