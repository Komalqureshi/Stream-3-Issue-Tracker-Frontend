import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import './checkout.css';
import { BASE_URL } from '../../services/settings';
import $ from 'jquery';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        complete:false
    }
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
        var {token} = await this.props.stripe.createToken({name:this.props.username});
        console.log(token);
        var response = await $.ajax({
            url:BASE_URL+'payments/charge/',
            method:"POST",
            data:{
                tok:token.id,
                issue:this.props.ticket,
                user:this.props.username
            },
            headers:{
                "Authorization":"token "+this.props.token
            },
            success:function(res){
                console.log(res);
            }
        })
        if(response.success) return this.setState({complete:true});
    }

  render() {
      if(this.state.complete) return <h1 className="purchasecomplete">Thank you for your support!</h1>
    return (
      <div className="checkout">
        <h1>To upvote a feature, you have to pay $5.</h1>
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);