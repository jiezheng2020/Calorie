from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Exercise, db , ExerciseEntry

exercise_routes = Blueprint('exercises', __name__)

@exercise_routes.route('/')
@login_required
def get_exercises():
    exercises = Exercise.query.all()
    return jsonify([exercise.to_dict() for exercise in exercises])

@exercise_routes.route('/', methods=['POST'])
@login_required
def create_custom():
    data = request.json
    newExercise = Exercise(
        name=data["name"],
        cpm= 0,
        exerciseType= "custom",
    )

    db.session.add(newExercise)
    db.session.commit()

    return newExercise.to_dict()

@exercise_routes.route('/entry', methods =['POST'])
@login_required
def create_entry():
    data = request.json

    newExercise = ExerciseEntry(
        exercise_id = data["exerciseId"],
        diary_id = data["diaryId"],
        totalCalories = data["totalCalories"]
    )

    db.session.add(newExercise)
    db.session.commit()
    print(data)
    print(newExercise)
    return newExercise.to_dict()

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