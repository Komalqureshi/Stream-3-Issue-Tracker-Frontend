import React from 'react';
import {connect} from 'react-redux';
import {fetchissuesassignedtome} from '../../../services/store/actions/issueActions';
import {Grid,Table,Icon,Label, Tab} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import './assigned.css';
import WOW from 'wowjs';

class AssignedToMe extends React.Component{

    componentDidMount(){
        var wow = new WOW.WOW();
        wow.init();
        var data = {
            user:this.props.authres.username
        }
        this.props.fetchissuesassignedtome(this.props.authres.token,data)
    }

    render(){
        const {assignedtome=[]} = this.props;
        return(
            <div className="app-content assignedtome table">
                    <Grid>
                <Grid.Row>
                    <Grid.Column width="16">
                    <Table className="wow slideInRight fadeIn" date-wow-duration="400ms">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Title</Table.HeaderCell>
                                <Table.HeaderCell>Reported by</Table.HeaderCell>
                                <Table.HeaderCell>Created</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Type</Table.HeaderCell>
                                <Table.HeaderCell>Urgency</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {assignedtome.map(issue => (
                                <Table.Row key={issue.id} className="assigned row">
                                    <NavLink to={`/unicornattractor/issues/${issue.id}`}>
                                        <Table.Cell as="p" className="title">{issue.title}</Table.Cell>
                                    </NavLink>
                                    <Table.Cell>{issue.reporter}</Table.Cell>
                                    <Table.Cell className="sec">{issue.created}</Table.Cell>
                                    <Table.Cell><Label className={`status tiny ${issue.status.toLowerCase()}`}>{issue.status}</Label></Table.Cell>
                                    <Table.Cell><Label className="type tiny">{issue.type} {issue.type ==="BUG" ? <Icon name="bug"/>:<Icon name="bell"/>}</Label></Table.Cell>
                                    <Table.Cell><Label className="urgency tiny">{issue.urgency}</Label></Table.Cell>
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
        assignedtome:state.issues.assignedtome,
        authres:state.user.authres
    }
}

export default connect(mapStateToProps,{fetchissuesassignedtome})(AssignedToMe);