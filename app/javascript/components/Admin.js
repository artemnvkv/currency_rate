import React from 'react'
import axios from 'axios'
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";

class Admin extends React.Component {
  state = {
    id: '',
    rate: '',
    expiration_date: ''
  }
  
  componentDidMount() {
    axios
      .get('/api/exchange_rates')
      .then(response => {
        this.setState(
          { 
            id: response.data.id,
            rate: response.data.rate,
            expiration_date: response.data.expiration_date == null ? null : moment(response.data.expiration_date).toDate()
          }
        );
        console.log(moment(response.data.expiration_date).toDate())//format('ddd MMM DD YYYY hh:mm:ss'))
      })
  }

  handleSubmit = event => {
    event.preventDefault();

    const exchange_rate = {
      rate: this.state.rate,
      expiration_date: this.state.expiration_date
    }

    axios
      .put(`/api/exchange_rates/${this.state.id}`, { 'exchange_rate': exchange_rate })
      .then(response => {

        console.log(response);
      })
  }

  handleChangeRate = event => {
    this.setState({
      rate: event.target.value
    })
  }

  handleChangeDate = date => {
    this.setState({
      expiration_date: date
    })
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <h1>Update Currency Rate</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
            <input
              name="rate"
              onChange={this.handleChangeRate}
              placeholder="63.7"
              value={this.state.rate}
              type="text"
            />
            <DatePicker
              name="expiration_date"
              selected={this.state.expiration_date}
              onChange={this.handleChangeDate}
              showTimeSelect
              timeIntervals={5}
              timeCaption="time"
              dateFormat="MM.dd.yyyy hh:mm"
            />
          <button>Update exchange rate</button>
        </form>
      </div>
    )
  }
}

export default Admin
