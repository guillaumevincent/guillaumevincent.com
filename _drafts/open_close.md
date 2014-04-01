from flask import Flask, send_file, jsonify, request
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, Column, Text


app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///votevalue.db'
db = SQLAlchemy(app)


class Vote(db.Model):
    __tablename__ = 'votes'

    id = Column(Integer, primary_key=True)
    name = Column(Text, unique=False)

    def __init__(self, name):
        self.name = name


db.create_all()


class Orm:
    def __init__(self, database):
        self.database = database

    def create(self, model):
        self.database.session.add(model)
        self.database.session.commit()


class VoteValidator:
    def __init__(self, vote, rules):
        self.vote = vote
        self.rules = rules
        self.errors = []

    def is_valid(self):
        is_valid = True
        for rule in self.rules:
            if not rule.is_valid(self.vote):
                self.errors.append(rule.error)
                is_valid = False
        return is_valid


class Rule:
    def __init__(self):
        self.error = {}


class NameMandatoryFieldRule(Rule):
    def is_valid(self, json):
        if 'name' not in json:
            self.error = {'code': 1, 'message': 'The name field is required to create a vote'}
            return False
        return True


class NameFieldCantBeEmptyRule(Rule):
    def is_valid(self, json):
        if json['name']:
            self.error = {'code': 1, 'message': 'The name field is required to create a vote'}
            return False
        return True


@app.route('/api/votes', methods=['POST'])
def vote():
    if 'name' not in request.json:
        return jsonify({'code': 1, 'message': 'The name field is required to create a vote'}), 400

    if not request.json['name']:
        return jsonify({'code': 2, 'message': 'The name field should not be empty'}), 400

    name = request.json['name']
    vote = Vote(name)
    Orm(db).create(vote)
    return jsonify(), 201, {'location': '/votes/' + str(vote.id)}


@app.route('/')
def index():
    return send_file('templates/index.html')


if __name__ == '__main__':
    app.run()