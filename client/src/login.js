import React from 'react'
import PropTypes from 'prop-types'
import PlaidLink from 'react-plaid-link'

class LinkAccount extends React.Component {

  handleSuccess(publicToken) {
    // make request for access_token
    fetch('/public_token/exchange', {
      method: 'POST',
      body: JSON.stringify({public_token: publicToken}),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    }).then((response) => {
      if (response.status === 201) {
        this.props.setAuthenticated()
      } else {
        console.log('something went wrong')
        console.log(response)
      }
    })
  }


  render() {
    return (
      <PlaidLink
        clientName={''}
        env={'sandbox'}
        product={['transactions']}
        publicKey={'cd9989bba4084b711787e940b539ea'}
        onExit={() => {}}
        onSuccess={this.handleSuccess.bind(this)}
      >
        Connect your bank
      </PlaidLink>
    )
  }
}

LinkAccount.propTypes = {
  setAuthenticated: PropTypes.func,
}

export default LinkAccount