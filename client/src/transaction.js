import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Divider, Box, Image, Panel, PanelFooter, PanelHeader } from 'rebass'

const TransactionTitle = ({domain, name}) => {
  if (domain) {
    return (<a href={'http://' + domain}>{name}</a>)
  }
  return <span>{name}</span>
}

const OptionalImage = ({src}) => {
  if (!src) {
    return null
  }
  return <Image width={32} src={src} />
}

class Transaction extends React.Component {
  render() {
    return (
      <Flex>
        <Box>
          <TransactionTitle
            name={this.props.transaction.name}
            domain={this.props.company.domain}
          />
          <OptionalImage src={this.props.company.logo}/>
        </Box>
        <Box>
          {this.props.transaction.date}
        </Box>
        <Box
          ml={'auto'}
          pr={5}
        >
          <div>
            {'$' + this.props.transaction.amount.toFixed(2).toLocaleString()}
          </div>
          {this.props.transaction.recurring && (<div> recurring</div>)}
        </Box>
      </Flex>
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
      console.log(response.status)
      return []
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
          <div>
            <Transaction
              transaction={t}
              company={this.state.companies[t.name] || {}}
              key={t.transaction_id}
            />
            <Divider />
          </div>
        )}
      </div>
    )
  }
}

export default TransactionsList
