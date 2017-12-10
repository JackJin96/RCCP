import json
from flask import Flask
app = Flask(__name__) #__name__ is built in, read the name of the current file

from flask import jsonify
from flask import request

@app.route('/')
def hello():
    return 'hello world'

#if we don't specify POST in the method, it is GET by default
@app.route('/build_and_run', methods = ['POST'])
def build_and_run():
    data = request.get_json()
    if 'code' not in data or 'lang' not in data:
        return '"code" and "lang" not provided'
    code = data['code']
    lang = data['lang']
    print("API got called with code: %s in language %s " % (code, lang))
    return jsonify({'build': 'build sth sth', 'run': 'run sth sth'})

if __name__ == '__main__':
    app.run(debug=True) 
    """default port 5000, debug=True is the same as nodemon, 
    used in developer mode to detect file change and rebuild"""