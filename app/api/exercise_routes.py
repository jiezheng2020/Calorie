from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Exercise, db , ExerciseEntry

exercise_routes = Blueprint('exercises', __name__)

@exercise_routes.route('/entry/<int:id>', methods =['PUT'])
@login_required
def edit_entry(id):
    data = request.json

    newExercise = ExerciseEntry.query.get(id)
    newExercise.totalCalories = data["totalCalories"]

    db.session.add(newExercise)
    db.session.commit()
    return newExercise.to_dict()


@exercise_routes.route('/entry/<int:id>', methods =['DELETE'])
@login_required
def delete_entry(id):
    entry = ExerciseEntry.query.get(id)

    db.session.delete(entry)
    db.session.commit()
    return {'message': 'deleted!'}