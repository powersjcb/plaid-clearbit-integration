#!/usr/bin/env python
import os
import flask
import plaid


app = flask.Flask(__name__)

"""
public_token:
    - representation of the user's authorization code for this application
    - one time use
    - 30 min expiration
access_token:
    - do not expire
"""

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


@app.route('/')
def access_token():
    # get access token using public_token
    public_token = flask.request.json().get('public_token')
    exchange_response = plaidClient.Item.public_token.exchange(public_token)
    return exchange_response['access_token']


def transactions():
    # get transactions
    return


app.run(debug=True)
