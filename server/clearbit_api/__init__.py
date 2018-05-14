import os
import flask
import clearbit


clearbit.key = os.environ['CLEARBIT_API_KEY']


clearbit_api = flask.Blueprint('clearbit_api', __name__)


@clearbit_api.route('/company', methods=['POST'])
def company():
    name = flask.request.json['name']
    name_response = clearbit.NameToDomain.find(name=name)
    if not name_response:
        return '', 204
    domain_response = clearbit.Company.find(domain=name_response['domain'])
    if not domain_response:
        return '', 204
    return flask.jsonify(domain_response), 200
