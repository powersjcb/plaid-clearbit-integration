import React from 'react';
import { Container, Button } from 'rebass'
import LinkAccount from './login.js'
import TransactionList from './transaction.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: window.sessionStorage.getItem('authenticated'),
    }
  }

  setAuthenticated = () => {
    window.sessionStorage.setItem('authenticated', true)
    this.setState({authenticated: true})
  }

  logout = () => {
    window.sessionStorage.clear()
    this.setState({authenticated: false})
  }

  render() {
    // conditional views based on login, no routing to keep it simple
    // renders transactions
    if (this.state.authenticated) {
      return (
        <div>
          <Button onClick={this.logout}>Logout</Button>
          <Container>
            <TransactionList />
          </Container>
        </div>

      )
    }
    // renders login view for PlaidLink
    return (
      <LinkAccount
        setAuthenticated={this.setAuthenticated}
      />
    );
  }
}

export default App;
