from collections import defaultdict
import datetime


RECURRING_THRESHOLD = 2


def tag_as_recurring(transaction, disposition):
    transaction['recurring'] = disposition
    return transaction


def recurring_keys(t):
    return t['name'], t['amount']


def per_month_keys(t):
    date = datetime.datetime.strptime(t['date'], '%Y-%m-%d')
    return t['name'], t['amount'], date.month


def add_recurring_inference(transactions):
    """
    enhances transactions with flag about recurring payments
    """
    recurring_count = defaultdict(lambda: 0)
    per_month_count = defaultdict(lambda: 0)

    for t in transactions:
        recurring_count[recurring_keys(t)] += 1
        per_month_count[per_month_keys(t)] += 1

    multiple_per_month_set = {
        key[:-1] for key, count in per_month_count.items()
        if count > 1
    }  # key -> name, amount

    recurring_set = {
        key for key, value in recurring_count.items()
        if value >= RECURRING_THRESHOLD
    }  # key -> name, amount

    return [
        tag_as_recurring(t, recurring_keys(t) in recurring_set and
                         recurring_keys(t) not in multiple_per_month_set)
        for t in transactions
    ]
