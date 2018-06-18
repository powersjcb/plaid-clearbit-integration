import os
import flask
import plaid
import datetime

from .transactions import add_recurring_inference


from flask import Blueprint

plaid_api = Blueprint('plaid_api', __name__)


PLAID_CLIENT_ID = os.environ['PLAID_CLIENT_ID']
PLAID_SECRET = os.environ['PLAID_SECRET']
PLAID_PUBLIC_KEY = os.environ['PLAID_PUBLIC_KEY']
PLAID_ENV = 'sandbox'


plaidClient = plaid.Client(
    PLAID_CLIENT_ID,
    PLAID_SECRET,
    PLAID_PUBLIC_KEY,
    PLAID_ENV,
)


def access_token():
    token = flask.session.get('plaid_access_token')
    if not token:
        flask.abort(401)
    return token


@plaid_api.route('/public_token/exchange', methods=['POST'])
def public_token_exchange():
    public_token = flask.request.json['public_token']
    exchange_response = plaidClient.Item.public_token.exchange(public_token)
    flask.session['plaid_access_token'] = exchange_response['access_token']
    return '', 201


@plaid_api.route('/item')  # item is the Plaid alias for links to banking institutions
def item():
    response = plaidClient.Item.get(access_token())
    return flask.jsonify(response['item']), 200


@plaid_api.route('/transactions')
def enhanced_transactions():
    end_date = datetime.datetime.now()
    start_date = end_date - datetime.timedelta(weeks=4 * 8)

    transactions_response = plaidClient.Transactions.get(
        access_token(),
        start_date=start_date.strftime('%Y-%m-%d'),  # YYYY-MM-DD formatted str
        end_date=end_date.strftime('%Y-%m-%d'),
    )

    return flask.jsonify(
        add_recurring_inference(transactions_response['transactions'])
    ), 200
