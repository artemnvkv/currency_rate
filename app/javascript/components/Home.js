import React from 'react'
import axios from 'axios'

class Home extends React.Component {
  state = {
    exchange_rate: {}
  };

  componentDidMount() {
    axios
      .get('/api/exchange_rates')
      .then(response => {
        this.setState({ exchange_rate: response.data });
      })
  }

  render() {
    console.log(this.state.exchange_rate)
    return (
      <div>
        <span>
          {this.state.exchange_rate == null ? '' : this.state.exchange_rate.rate}
        </span>
      </div>
    )
  }
}

export default Home
