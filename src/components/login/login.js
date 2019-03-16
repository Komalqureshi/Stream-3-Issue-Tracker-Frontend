import React from 'react';
import { Button,Form,Card,Modal,Message,Icon} from 'semantic-ui-react';
import $ from 'jquery';
import './login.css';
import WOW from 'wowjs';
import {connect} from 'react-redux';
import {login} from '../../services/store/actions/userActions';
import {Redirect} from 'react-router-dom';

class Login extends React.Component{

    state = {
        username:"",
        password:""
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

    handleLogin = (e) => {
        e.preventDefault();
        var data = {
            username:this.state.username,
            password:this.state.password
        }
        this.props.login(data);
    }
    
    render(){
        const {token,error={}} = this.props;
        const loggedIn = localStorage.getItem("loggedIn");
        if(loggedIn ===true){
            return <Redirect to="/app/dashboard"/>
        }else{
        return(
            <Modal trigger={<Button>Log in</Button>}>
            <Modal.Header>
                Sign in
            </Modal.Header>
            <Modal.Content>
            <div className="login">
            <Card className="login">
                <Card.Content className="header">
                   Login to Unicorn attractor
                </Card.Content>
                <Card.Content>
                <Form onSubmit={this.handleLogin}>
                    <Form.Input icon='user' iconPosition='left' name="username" onChange={this.handleOnChange} placeholder='Email' />
                    <Form.Input icon='lock' iconPosition='left' name="password" onChange={this.handleOnChange} type='password' />
                    <Button onClick={this.handleLogin}>Sign in <Icon name="long arrow alternate right"></Icon></Button>
                </Form>
                </Card.Content>
                {error.responseJSON ? <Card.Content className="wow slideInDown" data-wow-duration="400ms">
                    <Message className="wow fadeIn" warning>{error.responseJSON.error}</Message>
                </Card.Content>:null}
            </Card>
                </div>
            </Modal.Content>
            </Modal>
        );
            }
    }
}

const mapStateToProps = state =>{
    return{
        token:state.user.token,
        error:state.user.error
    }
}

export default connect(mapStateToProps,{login})(Login);