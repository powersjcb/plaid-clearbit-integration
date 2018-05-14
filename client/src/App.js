import React from 'react';
import LinkAccount from './login.js'

class App extends React.Component {
  render() {
    // conditional views based on login, no routing to keep it simple
    // renders transactions
    if (false) {
      return (
        <div>
        </div>
      )
    }
    // renders login view for PlaidLink
    return (
      <LinkAccount>
      </LinkAccount>
    );
  }
}

export default App;
