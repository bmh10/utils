from flask import Flask
from flask import request
import datetime
app = Flask(__name__)

@app.route("/feedback", methods=['POST'])
def hello():
  typ = request.form['type']
  msg = request.form['message']
  date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

  with open("feedback.log", "a") as feedbackFile:
    feedbackFile.write(date + " " + typ + " " + msg + "\n")
  return "Success"

if __name__ == "__main__":
    app.run()
