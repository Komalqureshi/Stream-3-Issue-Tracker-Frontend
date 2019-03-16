import React from 'react';
import './mainapp.css';
import {Switch,Route,Redirect} from 'react-router-dom';
import Dashboard from './dashboard/dashboard';
import CreateIssue from './createissue/createissue';
import Issues from './issues/issues';
import IssueView from './issues/issueView';
import MyIssues from './createdbyme/createdbyme';
import AssignedToMe from './assignedtome/assignedtome';
import Footer from '../../components/footer/footer';
import WOW from 'wowjs';
import $ from 'jquery';
import Bugs from './issues/bugs';
import Features from './issues/features';
import Navbar from '../../components/navbar/navbar';
import {connect} from 'react-redux';

class AppMain extends React.Component{
    
    componentDidMount(){
        var wow = new WOW.WOW();
        wow.init();
    }

    componentWillMount(){
        $('.main-app').addClass('wow zoomIn');
    }

    render(){
        const {authres={}} = this.props;
        if(authres.loggedIn === false) return <Redirect to='/'/>
            return(
                <Navbar>
                <div className="main-app" data-wow-duration="500ms" data-wow-delay="500ms">
                <Switch>
                    <Route path="/unicornattractor/dashboard" component={Dashboard}/>
                    <Route path="/unicornattractor/createissue" component={CreateIssue}/>
                    <Route exact path="/unicornattractor/issues" component={Issues}/>
                    <Route exact path="/unicornattractor/bugs" component={Bugs}/>
                    <Route exact path="/unicornattractor/features" component={Features}/>
                    <Route path="/unicornattractor/issues/:issueid" component={IssueView}/>
                    <Route path='/unicornattractor/createdbyme' component={MyIssues}/>
                    <Route path="/unicornattractor/assignedtome" component={AssignedToMe}/>
                </Switch>
                </div>
                </Navbar>
            );
    }
}

const mapStateToProps = state => {
    return{
        authres:state.user.authres
    }
}
export default connect(mapStateToProps)(AppMain);