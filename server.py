#!/usr/bin/env python
import os
import flask
import plaid
import datetime


app = flask.Flask(__name__)

"""
public_token:
    - representation of the user's authorization code for this application
    - one time use
    - 30 min expiration
access_token:
    - do not expire
"""

app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
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
    return flask.session.get('access_token')


@app.route('/test')
def test():
    app.logger.debug(access_token())
    return '', 200


@app.route('/public_token/exchange', methods=['POST'])
def public_token_exchange():
    public_token = flask.request.json['public_token']
    exchange_response = plaidClient.Item.public_token.exchange(public_token)
    flask.session['access_token'] = exchange_response['access_token']
    return '', 201


@app.route('/item')  # item is the Plaid alias for links to banking institutions
def item(access_token):
    response = plaidClient.Item.get(access_token())
    return flask.jsonify(response['item']), 200


@app.route('/transactions')
def transactions():
    # get transactions
    end_date = datetime.datetime.now()
    start_date = end_date - datetime.timedelta(weeks=4 * 4)
    transactions_response = plaidClient.Transactions.get(
        access_token(),
        start_date=start_date.strftime('%Y-%m-%d'),  # YYYY-MM-DD formatted str
        end_date=end_date.strftime('%Y-%m-%d'),
    )
    return flask.jsonify(transactions_response['transactions']), 200

# recurring payments
    # places that people shop at frequently
    # subscription payments: (Subset of recurring)
        # - occur more than once
        # - usually occur once per month
        # - have the same name
        # - have the same value


