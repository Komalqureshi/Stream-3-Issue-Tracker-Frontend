import React from 'react';
import {Card, Button, Header, Label} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {fetchIssueDetail,submitComment,upvote,closeissue,reopenissue} from '../../../services/store/actions/issueActions';
import ReactQuill from 'react-quill';
import WOW from 'wowjs';

// checkout
import CheckoutModal from '../../../components/stripecheckout/modal';


class IssueView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            comment:"",
            voted:this.props.issue.voted
        }
    }

    componentDidMount(){
        var wow = new WOW.WOW();
        wow.init();
        console.log(this.props.match.params.issueid);
        var data={
            issue:this.props.match.params.issueid,
            user:this.props.authres.username
        }
        this.props.fetchIssueDetail(this.props.authres.token,data);
    }

    handleCommentChange = (value) =>{
        this.setState({comment:value})
    }


    handleSubmitComment =() =>{
        var data = {
            user:this.props.authres.username,
            detail:this.state.comment,
            ref:this.props.match.params.issueid
        }
        this.props.submitComment(this.props.authres.token,data);
    }

    handleUpvote = () =>{
        if(this.state.voted===true){
            return null
        }else{
            var data ={
                user:this.props.authres.username,
                issue:this.props.match.params.issueid,
            }
            this.props.upvote(this.props.authres.token,data);
            this.setState({voted:true})
        }
    }

    handlecloseIssue = () =>{
        var data ={
            issue:this.props.match.params.issueid
        }
        this.props.closeissue(this.props.authres.token,data);
    }

    handlereopenissue = () => {
        var data = {
            issue:this.props.match.params.issueid
        }
        this.props.reopenissue(this.props.authres.token,data)
    }

    render(){
        const {issue={},authres={}} = this.props;
        return(
            <div className="app-content issueview">
            <Card className="wow slideInDown" data-wow-duration="500ms">
                <Card.Header>
                    {issue.title}
                    {issue.status ?
                        <Label className={`status tiny ${issue.status.toLowerCase()}`}>{issue.status}</Label>
                        :null}
                </Card.Header>
                {issue.reporter === authres.username 
                    ?
                    <Card.Content className="moreactions wow slideInRight">
                    <Button onClick={this.handlereopenissue} color="orange">Reopen issue</Button>
                    {issue.status === "CLOSED" ? null:
                        <Button onClick={this.handlecloseIssue} color="green" icon="circle check outline">Close issue</Button>
                    }
                    </Card.Content> 
                    :null}
                <Card.Content className="detail wow fadeIn">
                    <div dangerouslySetInnerHTML={{__html: issue.detail}}>
                    </div>
                    {issue.reporter === authres.username ? null:
                        <div className="actions">
                                {issue.type ==="BUG" ? 
                                <Button className={`basic ${issue.voted}`} 
                                onClick={this.handleUpvote}>
                                {issue.voted ===true ? "Already voted":"I have these too"}
                                </Button> 
                                :<CheckoutModal ticket={this.props.match.params.issueid}/> }
                        </div>
                    }
                </Card.Content>
                {issue.attemptedsolution ? 
                    <div>
                    {issue.attemptedsolution.length > 0 ? 
                    <Card.Content className="attemptedsolution wow slideInUp">
                    <Label>Attempted solution</Label>
                    <div dangerouslySetInnerHTML={{__html:issue.attemptedsolution}}>
                    </div>
                    </Card.Content>
                    :null}
                    </div>
                    :null}
                <Card.Content>
                <ReactQuill 
                        theme="bubble"
                        onChange={this.handleCommentChange}
                        value={this.state.comment}
                        // modules={CreateIssue.modules}
                        // formats={CreateIssue.formats}
                        bounds={'.app'}
                        placeholder="Leave a comment..."
                        />
                        <Button onClick={this.handleSubmitComment}>SEND</Button>
                </Card.Content>
                <Card.Content className="comments">
                {issue.comments ? 
                    <div>
                        {issue.comments.map(comment => (
                        <div>
                            <Header as='h4'>{comment.commentby} replied to issue #{comment.ref}</Header>
                        <div dangerouslySetInnerHTML={{__html:comment.detail}}>
                        </div>
                        </div>
                    ))}
                    </div>
                    :null}
                </Card.Content>
            </Card>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        issue:state.issues.issue,
        authres:state.user.authres
    }
}

export default connect(mapStateToProps,{fetchIssueDetail,
    submitComment,
    closeissue,
    reopenissue,
    upvote})(IssueView);