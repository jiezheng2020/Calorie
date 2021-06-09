from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  height = db.Column(db.Integer, nullable=True)
  weight = db.Column(db.Integer, nullable=False)
  age = db.Column(db.Integer, nullable=True)
  gender = db.Column(db.Integer, nullable=True)
  dailyGoal = db.Column(db.Integer, nullable=False, default=2000)

  diaries_owned= db.relationship('Diary', back_populates='owner')
  weight_progress = db.relationship('WeightProgress', back_populates='progress_owner')
  calorie_progress = db.relationship('CalorieProgress', back_populates='calorie_owner')

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "dailyGoal": self.dailyGoal,
      "weight": self.weight
    }
