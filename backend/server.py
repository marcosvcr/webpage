#!/usr/bin/env python3

import os
from flask import Flask, request, Response, make_response, jsonify, url_for,send_file
from flask_mail import Mail, Message
from flask_cors import CORS
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
import jsonpickle
import gridfs
import numpy as np
import pymongo
import json
from pymongo import MongoClient
from io import BytesIO
import mimetypes
from flask_socketio import SocketIO
from PIL import Image


app = Flask(__name__)
from auth import auth as auth_blueprint
app.register_blueprint(auth_blueprint)

# blueprint for non-auth parts of app
from main import main as main_blueprint
app.register_blueprint(main_blueprint)
app.config.from_pyfile('config.cfg')
client = MongoClient(port=27017)
#client = MongoClient("port=27017")
db = client['doardb']
s = URLSafeTimedSerializer('Thisisasecret!')
mail = Mail(app)
fs = gridfs.GridFS(db)
CORS(app, resources={r"/api/*": {"origins": "*"}})
#socketio = SocketIO(app, cors_allowed_origins='*')




class Server:


	def __init__(self):
		print("Starting Server")
		super(Server, self)



	def startDB(self):
		global db
		db.createCollection("people")
		db.createCollection("ongs")


	def start_server(self):
		global app
		port = int(os.environ.get("PORT", 5000))
		app.run(host = "0.0.0.0", port = port)


	@app.route('/api/requestSignupONG_POST', methods = ['GET','POST'])
	def request_signup_ong_post():
		global db
		global mail
		content = json.loads(request.form["ong-form"])
		image = request.files["ong-image"]
		ongs = db.ongs
		email = content['email']

##########################################################
		check = ongs.find_one({"email":email})
		if check != None:
			return jsonify({"code":601})


		check = ongs.find_one({"cnpj":content['cnpj']})
		if check != None:
			return jsonify({"code":603})
#########################################################
		image = fs.put(image, filename=content['cnpj'])
		imgId = {"image":image}


#########################################################
		dtype = {"type":"ONG"}
		confirmed = {"confirmed":"false"}

		token = s.dumps(email, salt='email-confirm')
		msg = Message('Confirmação de pré cadastro Plataforma Doar', sender='confirmacao.doar@gmail.com', recipients=[email])
		link = url_for('confirm_email_ONG', token=token, _external=True)
		tokenize = {"token":token}
		
		content.update(dtype)
		content.update(confirmed)
		content.update(tokenize)
		#content.update(imgId)
		result = ongs.insert_one(content)
		msg.body = 'Bem vindo a Plataforma Doar!!! Por favor clique no link {} para confirmar seu pré-cadastro'.format(link)
		mail.send(msg)
		print(result)
	
		return jsonify({"code":69})


	@app.route('/api/requestSignupUSER_POST', methods = ['GET','POST'])
	def request_signup_user_post():
		global db
		dtype = {"type":"PERSON"}
		confirmed = {"confirmed":"false"}
		content = request.json
		email = content['email']
		token = s.dumps(email, salt='email-confirm')
		msg = Message('Confirmação de pré cadastro Plataforma Doar', sender='confirmacao.doar@gmail.com', recipients=[email])
		link = url_for('confirm_email_USER', token=token, _external=True)
		tokenize = {"token":token}
		people = db.people

##########################################################
		check = people.find_one({"email":email})
		if check != None:
			return jsonify({"code":601})


		check = people.find_one({"cpf":content['cpf']})
		if check != None:
			return jsonify({"code":602})
#########################################################


		content.update(dtype)
		content.update(confirmed)
		content.update(tokenize)
		result = people.insert_one(content)
		msg.body = 'Bem vindo a Plataforma Doar!!! Por favor clique no link {} para confirmar seu pré-cadastro'.format(link)
		mail.send(msg)
		print(result)
		return jsonify({"code":69})

	@app.route('/')
	def hello_world():
		return '<h1>Running...</h1>'

	@app.route('/api/confirm_email_ONG/<token>')
	def confirm_email_ONG(token):
		qfilter = {"token":token}
		update = {"$set":{"confirmed":"true"}}
		try:	
			email = s.loads(token, salt='email-confirm', max_age=3600)
		except SignatureExpired:
			return '<h1>Link desatualizado</h1>'

		ongs = db.ongs
		ongs.find_and_modify(qfilter,update,upsert=False, full_response= True)
		return '<h1>Seu pré-cadastro foi confirmado com sucesso!</h1>'

###############################################################################################################
	@app.route('/api/requestSignin_POST', methods= ['POST','GET'])
	def requestSignin_POST():
		global db
		ongs = db.ongs
		people = db.people
		content = request.json
		email = content['email']
		pwd = content['pwd']
		
		check = people.find_one({"email":email})
		
		if check == None:
			secondCheck = ongs.find_one({"email":email})
			if secondCheck == None:
				return jsonify({"code":51})
				print(51)
			else:
				myquery = {"email":email}
				for ong in ongs.find(myquery,{"_id":0, "pwd":1,"salt":1,"type":1}):
					print(ong)
					return jsonpickle.encode(ong)
		else:
			myquery = {"email":email}
			for person in people.find(myquery,{"_id":0, "pwd":1,"salt":1,"type":1}):
				print(person)
				return jsonpickle.encode(person)
			

###############################################################################################################
	@app.route('/api/confirm_email_USER/<token>')
	def confirm_email_USER(token):
		global db
		qfilter = {"token":token}
		update = {"$set":{"confirmed":"true"}}
		try:	
			email = s.loads(token, salt='email-confirm', max_age=3600)
		except SignatureExpired:
			return '<h1>Link desatualizado</h1>'

		people = db.people
		people.find_and_modify(qfilter,update,upsert=False, full_response= True)
		return '<h1>Seu pré-cadastro foi confirmado com sucesso!</h1>'





	@app.route('/api/requestONGList', methods = ['GET', 'POST'])
	def get_all_ONGS():
		global db
		lst =[]
		count  = 0

		ongs = db.ongs
		#for ong in ongs.find():
		for ong in ongs.find({},{"_id":0,"fantasyName":1,"desc":1,"cnpj":1, "causes":1,"helpType":1, "confirmed":1}):
			#idx = ong.pop("image",None)
			#im_stream = fs.get(idx)
			#im = Image.open(im_stream)
			#img_io = BytesIO() 
			#im.save(img_io, 'JPEG', quality=70)
			#img_io.seek(0)
			#lst.append("info" + str(count))
			lst.append(ong)
			#lst.append("image" + str(count))
			#lst.append(send_file(img_io, mimetype='image/jpeg'))
			count+=1


		#res_dict = {lst[i]: lst[i + 1] for i in range(0, len(lst), 2)}
		#print(lst)
		#print(res_dict)

		return jsonpickle.encode(lst)



	@app.route('/api/requestUSERList', methods = ['GET', 'POST'])
	def get_all_USER():
		global db
		lst =[]
		count  = 0

		people = db.people
		#for ong in ongs.find():
		for person in people.find({},{"_id":0,"name":1,"cpf":1, "birthDate":1, "confirmed":1}):
			#idx = ong.pop("image",None)
			#im_stream = fs.get(idx)
			#im = Image.open(im_stream)
			#img_io = BytesIO() 
			#im.save(img_io, 'JPEG', quality=70)
			#img_io.seek(0)
			#lst.append("info" + str(count))
			lst.append(person)
			#lst.append("image" + str(count))
			#lst.append(send_file(img_io, mimetype='image/jpeg'))
			count+=1


		#res_dict = {lst[i]: lst[i + 1] for i in range(0, len(lst), 2)}
		#print(lst)
		#print(res_dict)

		return jsonpickle.encode(lst)


	@app.route('/api/requestImageProfile', methods = ['GET', 'POST'])  
	def get_Image_profile():
		global fs
		content = request.json
	
		_idImg = content['idImage']
		try:
			im_stream = fs.get_last_version(_idImg)
		except gridfs.errors.NoFile:
			return jsonify({"code":51})
		im = Image.open(im_stream)
		rgb_im = im.convert("RGB")
		if content["thumbnail"] == 1:
			rgb_im = im.convert("RGB")
			rgb_im = rgb_im.resize((128,128), Image.ANTIALIAS)
		img_io = BytesIO() 
		rgb_im.save(img_io, 'JPEG', quality=70)
		img_io.seek(0)

		return send_file(img_io, mimetype='image/jpeg')


	@app.route('/api/getDetails', methods = ['GET', 'POST'])
	def get_details():
		global db

		content = request.json

		if "cnpj" in content:
			ongs = db.ongs
			myquery = {"cnpj":content["cnpj"]}
			for ong in ongs.find(myquery,{"_id":0, "cnpj":1,"social":1,"fantasyName":1,"address":1,"num":1,"compl":1,"cep":1,"city":1,"brState":1,"tel":1,"email":1,"desc":1,"causes":1,"helpType":1,"dontShowAddress":1,"bank":1,"bankAccount":1,"bankAgency":1,"confirmed":1}):
				print(ong)
				return jsonpickle.encode(ong)

		elif "cpf" in content:
			people = db.people
			myquery = {"cpf":content["cpf"]}
			for person in people.find(myquery, {"_id":0, "cpf":1,"name":1,"birthDate":1,"tel":1,"email":1, "confirmed":1}):
				print(person)
				return jsonpickle.encode(person)

		else:
			return jsonify({"code":51})







def main():
	server = Server()
	#server.startDB()
	server.start_server()

if __name__ == "__main__":
	main()


