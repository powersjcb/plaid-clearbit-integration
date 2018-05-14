import React from 'react'
import PropTypes from 'prop-types'


const TransactionTitle = ({domain, name}) => {
  if (domain) {
    return (<a href={'http://' + domain}>{name}</a>)
  }
  return <span>{name}</span>
}

class Transaction extends React.Component {
  render() {
    return (
      <div>
        <div>
          <TransactionTitle
            name={this.props.transaction.name}
            domain={this.props.company.domain}
          />
        </div>
        <div>
          {this.props.transaction.date}
        </div>
        <div>
          {this.props.transaction.amount}
        </div>
        <div>
          {this.props.company.location}
        </div>
        <div>
          {this.props.transaction.recurring && (<span>RECURRING</span>)}
        </div>
        <hr/>
      </div>
    )
  }
}

Transaction.propTypes = {
  transaction: PropTypes.object,
  company: PropTypes.object,
}

const fetchTransactions = (setState, transactionsCallback) => {
  fetch('/transactions', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then(
    (response) => {
    if (!response.ok) {
      throw new Error(response.status)
    }
    return response.json()
  }).then(
    (json) => {
      setState({transactions: json})
      transactionsCallback(json, setState)
    })
}

const fetchCompanies = (transactions, setState) => {
  const companyNames = new Set(transactions.map(t => t.name))
  companyNames.forEach((name) => {
    fetch('/company', {
      method: 'POST',
      body: JSON.stringify({name: name}),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((response) => {
      if (!response.ok || response.status === 204) {
        console.log('Invalid response:' + response.status)
      } else {
        return response.json().then((json) => {
          setState((state) => {
            const updatedCompanies = {...state.companies}
            updatedCompanies[name] = json
            return {companies: updatedCompanies}
          })
        })
      }
    })
  })
}

class TransactionsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
      companies: {}
    }
  }

  componentDidMount() {
    fetchTransactions(this.setState.bind(this), fetchCompanies)
  }

  render() {
    console.log(this.state)
    return (
      <div>
        {this.state.transactions.map(t =>
          <Transaction
            transaction={t}
            company={this.state.companies[t.name] || {}}
            key={t.transaction_id}
          />
        )}
      </div>
    )
  }
}

export default TransactionsList
