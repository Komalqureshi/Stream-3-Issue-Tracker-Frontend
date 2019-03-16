import React from 'react';
import {Modal,Button} from 'semantic-ui-react';
import CheckoutForm from './checkout';
import {StripeProvider,Elements} from 'react-stripe-elements';
import WOW from 'wowjs';
import {connect} from 'react-redux';

class CheckoutModal extends React.Component{

    componentDidMount(){
        var wow = new WOW.WOW();
        wow.init();
    }

    onPay = () =>{
        
    }

    render(){
        const {authres={}} = this.props;
        return(
            <Modal trigger={<Button>I want these too</Button>} className="wow bounceIn" data-wow-duration="2s">
            <Modal.Header>
                Unicorn attractor
            </Modal.Header>
            <Modal.Content>
            <StripeProvider apiKey="pk_test_u9sFOp6xwhXQAROcTr8Sz9Sn">
                <div className="example">
                <Elements>
                    <CheckoutForm ticket={this.props.ticket} token={authres.token} username={authres.username} />
                </Elements>
                </div>
            </StripeProvider>
            </Modal.Content>
          </Modal>
        );
    }
}
const mapStateToProps = state =>{
    return{
        authres:state.user.authres,
    }
}

export default connect(mapStateToProps)(CheckoutModal);