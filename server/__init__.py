import flask

from .plaid_api import plaid_api
from .clearbit_api import clearbit_api

app = flask.Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route('/test')
def test():
    return '', 200


app.register_blueprint(plaid_api)
app.register_blueprint(clearbit_api)
