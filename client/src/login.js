import React from 'react'
import PlaidLink from 'react-plaid-link'

// TODO: implement callbacks

const handleSuccess = (publicToken) => {
  // make request for access_token
  fetch('public_token/exchange', {
    method: 'POST',
    body: JSON.stringify({public_token: publicToken}),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((response) => {
      console.log(response)
    // show show transaction screen
  })
}

const LinkAccount = ({setLinkIdentifier}) => {
  return (
    <PlaidLink
      clientName={''}
      env={'sandbox'}
      product={['transactions']}
      publicKey={'cd9989bba4084b711787e940b539ea'}
      onExit={() => {}}
      onSuccess={handleSuccess}
    >
      Connect your bank
    </PlaidLink>
  )
}

export default LinkAccount