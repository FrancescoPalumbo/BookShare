"""
    University: Parthenope (Naples-Italy)
    Department: Science and Technology
    Author: Francesco Palumbo
"""

from flask import Flask, render_template, url_for, request, session, redirect, json
from flask_pymongo import PyMongo
import bcrypt

app = Flask(__name__)

app.secret_key = 'mysecret'

# connect to MongoDB with the defaults
app.config['MONGO_DBNAME'] = 'BookShare'
mongo = PyMongo(app)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login', methods=["POST"])
def login():
    users = mongo.db.USERS
    login_user = users.find_one({'email' : request.form['email']})

    if login_user:
        if bcrypt.hashpw(request.form['psw'].encode('utf-8'), login_user['psw'].encode('utf-8')) == login_user['psw'].encode('utf-8'):
            session['email'] = request.form['email']
            return redirect(url_for('homepage'))
        return render_template('error.html',type_error="Invalid Password.")
    return render_template('error.html',type_error="Invalid Email.")

@app.route('/register', methods=["POST"])
def register():
    users = mongo.db.USERS
    existing_user = users.find_one({'email' : request.form['email']})

    if existing_user is None:
        if request.form['psw'] == request.form['psw-repeat']:
            hashpass = bcrypt.hashpw(request.form['psw'].encode('utf-8'), bcrypt.gensalt())
            session['email'] = request.form['email']
            users.insert({'name' : request.form['name'],'surname' : request.form['l_name'], 'kind_book' : request.form['kind'],'email' : request.form['email'], 'psw' : hashpass, 'id_book_fav' : [] })
            return redirect(url_for('homepage'))
        return render_template('error.html',type_error="Password Incorrect.")
    return render_template('error.html',type_error="That email already exists!")

@app.route('/profile')
def profile():
    users = mongo.db.USERS
    login_user = users.find_one({'email' : session['email']})

    user_name = login_user['name']
    user_surname = login_user['surname']
    user_id_book = login_user['id_book_fav']
    return render_template('profile.html', name=user_name, surname=user_surname, array=json.dumps(user_id_book))

@app.route('/homepage')
def homepage():
    users = mongo.db.USERS
    login_user = users.find_one({'email' : session['email']})

    kind_book_user = login_user['kind_book']
    return render_template('homepage.html',k_book=kind_book_user)

@app.route('/book_features/<id>')
def book_features(id):
    users = mongo.db.USERS
    login_user = users.find_one({'email' : session['email']})

    return render_template('book_features.html', value_id=id)

@app.route('/<id>')
def addbook(id):
    users = mongo.db.USERS
    users.update({'email' : session['email']},{ '$addToSet': { 'id_book_fav': id } })

    return ('', 204)

@app.route('/r/<id>')
def rembook(id):
    users = mongo.db.USERS
    users.update({'email' : session['email']},{ '$pull': { 'id_book_fav': id } })

    return redirect(url_for('profile'))

@app.route('/logout', methods=['GET'])
def logout():
    session.clear()

    return redirect(url_for('index'))

if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(debug=True)