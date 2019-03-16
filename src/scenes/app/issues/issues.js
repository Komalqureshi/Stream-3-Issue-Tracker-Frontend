import React from 'react';
import {Grid,Card,Form, Icon,Button,Divider, Table,Label} from 'semantic-ui-react';
import './issues.css';
import {connect} from 'react-redux';
import {fetchIssues } from '../../../services/store/actions/issueActions';
import {NavLink} from 'react-router-dom';
import WOW from 'wowjs';


class Issues extends React.Component{

    componentDidMount(){
        var wow = new WOW.WOW();
        wow.init();
        this.props.fetchIssues(this.props.authres.token);
    }
    render(){
        const {features = [],bugs =[],error={},issues=[]} = this.props;
        return(
            <div className="app-content issues table">
            <Grid>
                <Grid.Row>
                    <Grid.Column width="16">
                    <Table className="wow slideInDown fadeIn" data-wow-duration="400ms">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Title</Table.HeaderCell>
                                <Table.HeaderCell>Assignee</Table.HeaderCell>
                                <Table.HeaderCell>Created</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Type</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {issues.map(issue => (
                                <Table.Row key={issue.id} className="issuerow row">
                                    <NavLink to={`/unicornattractor/issues/${issue.id}`}>
                                        <Table.Cell as="p" className="title">{issue.title}</Table.Cell>
                                    </NavLink>
                                    <Table.Cell className='assignee'>{issue.assignee === null? "-":issue.assignee}</Table.Cell>
                                    <Table.Cell className="sec">{issue.created}</Table.Cell>
                                    <Table.Cell><Label className={`status tiny ${issue.status.toLowerCase()}`}>{issue.status}</Label></Table.Cell>
                                    <Table.Cell><Label className="type tiny">{issue.type} {issue.type ==="BUG" ? <Icon name="bug"/>:<Icon name="bell"/>}</Label></Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        features:state.issues.features,
        bugs:state.issues.bugs,
        error:state.issues.error,
        authres:state.user.authres,
        issues:state.issues.issues
    }
}

export default connect(mapStateToProps,{fetchIssues})(Issues);