import React from  'react';
import {Grid,Table,Label,Icon} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchmyissues} from '../../../services/store/actions/issueActions';
import './byme.css';
import WOW from 'wowjs';


class MyIssues extends React.Component{

    componentDidMount(){
        var wow =new WOW.WOW();
        wow.init();
        var data = {
            user:this.props.authres.username
        }
        this.props.fetchmyissues(this.props.authres.token,data);
    }

    render(){
        const {myissues=[]} = this.props;
        return(
            <div className="app-content createdbyme table">
                <Grid>
                <Grid.Row>
                    <Grid.Column width="16">
                    <Table className="wow slideInUp fadeIn" data-wow-duration="400ms">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Title</Table.HeaderCell>
                                <Table.HeaderCell>Assigned to</Table.HeaderCell>
                                <Table.HeaderCell>Created</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Type</Table.HeaderCell>
                                <Table.HeaderCell>Urgency</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {myissues.map(issue => (
                                <Table.Row key={issue.id} className="createdbymerow row">
                                    <NavLink to={`/unicornattractor/issues/${issue.id}`}>
                                        <Table.Cell as="p" className="title">{issue.title}</Table.Cell>
                                    </NavLink>
                                    <Table.Cell>{issue.assignee === null ? "-":issue.assignee}</Table.Cell>
                                    <Table.Cell className="sec">{issue.created}</Table.Cell>
                                    <Table.Cell><Label className={`status tiny ${issue.status.toLowerCase()}`}>{issue.status}</Label></Table.Cell>
                                    <Table.Cell><Label className="type tiny">{issue.type} {issue.type ==="BUG" ? <Icon name="bug"/>:<Icon name="bell"/>}</Label></Table.Cell>
                                    <Table.Cell>{issue.urgency}</Table.Cell>
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

const mapStateToProps = state => {
    return{
        myissues:state.issues.myissues,
        authres:state.user.authres
    }
}

export default connect(mapStateToProps,{fetchmyissues})(MyIssues);