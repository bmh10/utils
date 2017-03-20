from flask import Flask
from flask import request
app = Flask(__name__)

@app.route("/feedback", methods=['POST'])
def hello():
  typ = request.form['type']
  msg = request.form['message']

  with open("feedback.log", "a") as feedbackFile:
    feedbackFile.write(typ + " " + msg)
  return "Success"

if __name__ == "__main__":
    app.run()
