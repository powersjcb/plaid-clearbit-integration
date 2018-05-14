import React from 'react';
import LinkAccount from './login.js'
import TransactionList from './transaction.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: true
    }
  }

  setAuthenticated() {
    this.setState({authenticated: true})
  }

  render() {
    // conditional views based on login, no routing to keep it simple
    // renders transactions
    if (this.state.authenticated) {
      return (
        <TransactionList />
      )
    }
    // renders login view for PlaidLink
    return (
      <LinkAccount
        setAuthenticated={this.setAuthenticated.bind(this)}
      />
    );
  }
}

export default App;
