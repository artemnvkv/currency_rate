import React from 'react'
import axios from 'axios'
import { Table } from "react-bootstrap";

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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Code</th>
            <th>Units</th>
            <th>Currency</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr className="rate_usd">
            <td>USD</td>
            <td>1</td>
            <td>US dollar</td>
            <td>{this.state.exchange_rate == null ? '' : this.state.exchange_rate.rate}</td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

export default Home
