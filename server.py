#!/usr/bin/env python
import flask


app = flask.Flask(__name__)

"""
public_token:
    - representation of the user's authorization code for this application
    - one time use
    - 30 min expiration
access_token:
    - do not expire
"""



@app.route('/')
def access_token():
    # get access token using public_token
    return


def transactions():
    # get transactions
    return


app.run(debug=True)


# PLAID_CLIENT_ID=5af5e46259079700130f14bd PLAID_SECRET=427ec4f0f5c9553f3315459af25b71 PLAID_PUBLIC_KEY=cd9989bba4084b711787e940b539ea PLAID_ENV=sandbox pipenv shell python ./server.py