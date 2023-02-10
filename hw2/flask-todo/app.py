from flask import Flask
app = Flask(__name__)

#ControlFlow
#Routing
@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == "__main__":
    #Props
    app.run(debug=True)