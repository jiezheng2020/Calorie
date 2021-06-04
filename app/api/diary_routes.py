from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from sqlalchemy import and_
from app.models import Diary

diary_routes = Blueprint('diaries', __name__)

@diary_routes.route('/')
@login_required
def get_diary():
    diary = Diary.query.filter((Diary.user_id == current_user.id)).all()

    return jsonify([diaries.to_dict() for diaries in diary])