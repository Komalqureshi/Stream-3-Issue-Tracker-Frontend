import React from 'react';
import WOW from 'wowjs';
import {
    Card,
    Form,
    Button,
    Modal,
    Message
} from 'semantic-ui-react';
import './signup.css';
import {connect} from 'react-redux';
import {signup} from '../../services/store/actions/userActions';
import $ from 'jquery';

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstname:"",
            lastname:"",
            email:"",
            password:"",
            username:"",
            cpassword:"",
            localError:null
        }
    }

    componentDidMount(){
        var wow = new WOW.WOW();
        wow.init();
    }

    handleOnChange = (e) =>{
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]:value
        })
    }

    handleSignUp = () =>{
        this.validateForm();
        this.passwordsMatch();
        if(this.state.error){
            return this.state.error
        }else{
            var data = {
                firstname:this.state.firstname,
                lastname:this.state.lastname,
                email:this.state.email,
                password:this.state.password,
                username:this.state.username,
            }
            this.props.signup(data);
    }
    }

    validateForm = () =>{
        var fields = ['firstname','lastname','email','password','username','cpassword'];
        fields.forEach(function(field){
            if(`this.state.${field}`.length < 1){
                this.setState({localError:"Please fill out all the fields!"})
            }
        })
    }

    passwordsMatch = () =>{
        if(this.state.password === this.state.cpassword){
            return this.setState({error:false})
        }else{
            $('input .cpass').addClass('error');
            return this.setState({error:true})
        }
    }

    render(){
        const {error={}} = this.props;
        const {localError} = this.state;

        return(
            <Modal className="wow zoomIn" trigger={<Button className={this.props.elclass} content="Join our community"></Button>}>
                <Modal.Content>
            <Card className="signup wow bounceIn" data-wow-duration="400ms">
                <Card.Content className='header'>
                    Join our community
                </Card.Content>
                <Card.Content>
                <Form autofill="false">
                <Form.Input required onChange={this.handleOnChange} icon='user' type="text" name="firstname" iconPosition='left' placeholder='First name' />
                <Form.Input required onChange={this.handleOnChange} icon='user' type="text" name="lastname" iconPosition='left' placeholder='Last name' />
                <Form.Input required onChange={this.handleOnChange} icon='mail' type="email" name="email" iconPosition='left' placeholder='Email' />
                <Form.Input required autofill="false" onChange={this.handleOnChange} icon="user" type="text" name="username" iconPosition="left" placeholder="Choose a username"/>
                <Form.Input required autofill="false" onChange={this.handleOnChange} icon='lock' type="password" name="password" iconPosition='left' placeholder='Password' />
                <Form.Input required className="cpass" onChange={this.handleOnChange} icon='lock' type="password" name="cpassword" iconPosition='left' placeholder='Confirm password' />
                <Button type="submit" onClick ={this.handleSignUp} content="Create account"/>
                </Form>
                {error.responseJSON ? <Card.Content className="wow slideInDown" data-wow-duration="400ms">
                    <Message className="wow fadeIn" warning>{error.responseJSON.error}</Message>
                </Card.Content>:null}
                {localError ?
                    <div>
                        {localError.length < 1 ? null : <Message className="warning">{localError}</Message>}
                    </div>
                    :null}
                </Card.Content>
            </Card>
            </Modal.Content>
            </Modal>
        );
    }
}

const mapStateToProps = state =>{
    return{
        authres:state.user.authres,
        error:state.user.error
    }
}

export default connect(mapStateToProps,{signup})(SignUp);