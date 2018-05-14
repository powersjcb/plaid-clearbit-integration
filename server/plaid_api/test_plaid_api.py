import pytest
from .transactions import add_recurring_inference


@pytest.fixture
def non_recurring_trans():
    return [
        {
            'account_id': 'l4l5qDZpPkI9BjbWxePwt8mNDMvBppfZmoJME',
            'amount': 25,
            'date': '2017-12-27',
            'name': 'CREDIT CARD 3333 PAYMENT *//',
        },
        {
            'amount': 5.4,
            'date': '2017-12-27',
            'name': 'Uber 063015 SF**POOL**',
        }
    ]


@pytest.fixture
def recurring_trans():
    return [
        {
            'amount': 78.1,
            'date': '2017-11-27',
            'name': 'Touchstone climbing'
        },
        {
            'amount': 78.1,
            'date': '2017-12-27',
            'name': 'Touchstone climbing'
        },
        {
            'amount': 78.1,
            'date': '2017-10-27',
            'name': 'Touchstone climbing'
        }
    ]


def test_enhances(recurring_trans):
    transactions = add_recurring_inference(recurring_trans)
    assert transactions  # ensure non-empty return value
    for t in transactions:
        assert t['recurring'] is True


def test_enhances_non(non_recurring_trans):
    transactions = add_recurring_inference(non_recurring_trans)
    assert transactions
    for t in transactions:
        assert t['recurring'] is False

