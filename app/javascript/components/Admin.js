import React from 'react'
import axios from 'axios'
import DatePicker from "react-datepicker";
import moment from 'moment'
import { Button, Form, Row, Col } from "react-bootstrap";

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
        console.log(moment(response.data.expiration_date).toDate())
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

  validateForm() {
    return moment(this.state.expiration_date).isAfter(moment().toDate());
  }

  render() {
    return (
      <div className="RateForm">
        <Form onSubmit={e => this.handleSubmit(e)}>
          <h2>Update Currency Rate</h2>
          <Form.Group as={Row} controlId="formBasicExchangeRate">
            <Form.Label column sm={{ span: 2, offset: 1 }}>
              Rate
            </Form.Label>
            <Col sm="9">
              <Form.Control size="sm" type="number" placeholder="63.7" value={this.state.rate} onChange={this.handleChangeRate} required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid exchange rate.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formBasicDate">
            <Form.Label column sm={{ span: 2, offset: 1 }}>
              Date
            </Form.Label>
            <Col sm="9">
              <DatePicker
                className="form-control form-control-sm"
                name="expiration_date"
                selected={this.state.expiration_date}
                onChange={this.handleChangeDate}
                showTimeSelect
                timeIntervals={5}
                timeCaption="time"
                dateFormat="dd.MM.yyyy hh:mm"
              />
              <Form.Label className="error" srOnly={this.validateForm()} >
                Date and time can't be in the past.
              </Form.Label>
            </Col>
          </Form.Group>
            <Col sm="8">
              <Button variant="primary" disabled={!this.validateForm()} type="submit">
              Update exchange rate
              </Button>
            </Col>
        </Form>
      </div>
    )
  }
}

export default Admin
