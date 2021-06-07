from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import and_
from app.models import Diary, db

diary_routes = Blueprint('diaries', __name__)

@diary_routes.route('/')
@login_required
def get_diary():
    diary = Diary.query.filter(Diary.user_id == current_user.id).all()

    return jsonify([diaries.to_dict() for diaries in diary])

@diary_routes.route('/', methods=['POST'])
@login_required
def create_diary():
    data = request.json
    currDate = data["currDate"]

    diary = Diary.query.filter(Diary.user_id == current_user.id).all()
    diaryArray = [diaries.to_dict() for diaries in diary]

    for check in diaryArray:
        if check['date'].find(currDate) == True:
            return {'message': 'diary already exists'}

    newDiary = Diary(user_id = current_user.id, date=currDate)
    db.session.add(newDiary)
    db.session.commit()
    return newDiary.to_dict()
