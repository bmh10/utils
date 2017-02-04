from flask import Flask
app = Flask(__name__)

@app.route("/feedback", methods=['POST'])
def hello():
  print request.form['type']
  return "Hello World!"

if __name__ == "__main__":
    app.run()
