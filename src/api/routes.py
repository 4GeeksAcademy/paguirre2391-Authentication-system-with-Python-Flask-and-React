"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Pet
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


# Create flask app
api = Blueprint('api', __name__)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "carolina" or password != "test":
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route('/private', methods=['GET'])
@jwt_required()
def get_authorization():
    email = get_jwt_identity()
    response_body = {
        "message": "Hello! "+email
    }
    return jsonify(response_body), 200

@api.route('/pets', methods=['GET'])
def get_all_pets():
    pets = Pet.query.all()
    pets_serialized = [pet.serialize() for pet in pets]
    return jsonify({"pets": pets_serialized}), 200
# in the flux file, in the getAllPets() function we put 'data.pets' becauase that's what we passed in the 'return jsonify'

