from flask import Flask
from flask import request
app = Flask(__name__)

@app.route("/feedback", methods=['POST'])
def hello():
  print request.form['type']
  print request.form['message']
  return "Success"

if __name__ == "__main__":
    app.run()
