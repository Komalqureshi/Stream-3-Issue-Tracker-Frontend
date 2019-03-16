import React from 'react';
import './menu.css';
import {Icon,Menu} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import CreateIssue from '../../scenes/app/createissue/createissue';
import $ from 'jquery';
import {connect} from 'react-redux';
import {logout} from '../../services/store/actions/userActions';

class MenuItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeItem:"dashboard",
            show:false
        }
    }

    componentDidMount(){
      this.setState({
        show:this.props.show
      })
      $('.menuoverlay').on('click',function(){
        $('.sidemenu').removeClass('true');
        $('.sidemenu').addClass('false');
        $('.navbar .togglemenu').addClass('bars');
        $('.navbar .togglemenu').removeClass('close');
      })
    }

    toggleSideMenu = (e) =>{
      this.setState({
        show:!this.state.show
      })
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleLogout = () =>{
      this.props.logout(this.props.authres.token);
      localStorage.removeItem('ua_state');
    }

    render(){
        const showmenu = this.state.show;
        const {activeItem} = this.state;
        return(
            <div className={`sidemenu ${showmenu}`}>
            <div className="menuoverlay"></div>
            <CreateIssue/>
            <Menu icon='labeled' vertical>
            <NavLink to="/unicornattractor/dashboard">
                <Menu.Item 
                  as="li"
                  name='dashboard' 
                  active={activeItem === 'dashboard'} 
                  onClick={this.handleItemClick}
                  >
                  <Icon name='desktop' />
                  Dashboard
                </Menu.Item>
              </NavLink>

              <NavLink to="/unicornattractor/bugs">
              <Menu.Item
              as="li"
                name='issues'
                active={activeItem === 'bugs'}
                onClick={this.handleItemClick}
              >
                <Icon name='bug' />
                Bugs
              </Menu.Item>
              </NavLink>

              <NavLink to="/unicornattractor/features">
              <Menu.Item
              as="li"
                name='issues'
                active={activeItem === 'features'}
                onClick={this.handleItemClick}
              >
                <Icon name='bell' />
                Features
              </Menu.Item>
              </NavLink>


              <NavLink to="/unicornattractor/createdbyme">
              <Menu.Item
                as="li"
                link={false}
                name='my issues'
                active={activeItem === 'my issues'}
                onClick={this.handleItemClick}
              >
                <Icon name='user' />
                My issues
              </Menu.Item>
              </NavLink>

              <NavLink to='/unicornattractor/assignedtome'>
              <Menu.Item
                as="li"
                name='assigned to me'
                active={activeItem === 'assigned to me'}
                onClick={this.handleItemClick}
              >
                <Icon name='user md' />
                Assigned to me
              </Menu.Item>
              </NavLink>

              <Menu.Item
                as="li"
                name='logout'
                active={activeItem === 'logout'}
                onClick={this.handleLogout}
              >
                <Icon name='sign-out' />
                Sign out
              </Menu.Item>
      </Menu>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return{
    authres:state.user.authres
  }
}

export default connect(mapStateToProps,{logout})(MenuItem);