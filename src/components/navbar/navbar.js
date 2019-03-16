import React from 'react';
import './navbar.css';
import {connect} from 'react-redux';
import {logout} from '../../services/store/actions/userActions';
import Logo from '../../logo.svg';
import {NavLink,Redirect} from 'react-router-dom';
import CreateIssue from '../../scenes/app/createissue/createissue';
import {Icon} from 'semantic-ui-react';
import $ from 'jquery';
import MenuItem from '../menu/menu';
import Login from '../login/login';
import Signup from '../signup/signup';

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showmenu:false
        }
    }

    componentDidMount(){
        $('.navbar .bars.togglemenu').on('click',function(){
            $('.togglemenu').removeClass('bars');
            $('.togglemenu').addClass('close');
            $('.sidemenu').addClass('true');
        })
    }

    handleLogout = () =>{
        this.props.logout(this.props.authres.token);
        localStorage.removeItem('ua_state');
        return <Redirect to="/"/>
    }

    showMenu =() =>{
        this.setState({
            showmenu:!this.state.showmenu
        })
    }

    render(){
        const { authres={}} = this.props;
        if(authres.loggedIn === "false") return <Redirect to='/'/>;
        return(
            <div>
                     <div className={`navbar ${authres.loggedIn === "true" ? "loggedin":null}`}>
                     {authres.loggedIn === true ? null:
                <div className="loginsignup">
                    <Login/>
                    <Signup/>
                    </div>
                    }
                        {authres.loggedIn === true ? 
                        <div>
                        <MenuItem show={this.state.showmenu}/>
                        <Icon name={this.state.showmenu ? "close":"bars"} className="togglemenu" onClick={e => this.showMenu()}></Icon>
                        </div>
                        :null}
                            <div className="header nav">
                            <p>Unicorn Attractor</p>
                            </div>
                            <div>
                                {authres.loggedIn ===true ?
                                        <div className="ui secondary menu">
                                            <div className="navigation left menu">
                                                <NavLink to='/unicornattractor/dashboard'>Dashboard</NavLink>
                                                <NavLink to='/unicornattractor/bugs'>Bugs</NavLink>
                                                <NavLink to='/unicornattractor/features'>Features</NavLink>
                                                <NavLink to='/unicornattractor/createdbyme'>Mine</NavLink>
                                                <NavLink to='/unicornattractor/assignedtome'>Assigned to me</NavLink>
                                            </div>
                                            <div className="right menu">
                                                <span className='welcome'>
                                                Welcome, {authres.username}
                                                </span>
                                                <button className="ui basic button logout" onClick={this.handleLogout}>LOG OUT<Icon name="sign-out"></Icon></button>
                                            </div>
                                        </div>
                                :null}
                            </div>
                            </div>
                {this.props.children}
            </div>
            
        );
    }
}



const mapStateToProps = state =>{
    return {
        authres:state.user.authres
    }
}

export default connect(mapStateToProps,{logout})(Navbar);