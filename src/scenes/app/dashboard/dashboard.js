import React from 'react';
import {connect} from 'react-redux';
import {Grid,Card, Icon,Message} from 'semantic-ui-react';
import './dashboard.css';
import {fetchDashboard} from '../../../services/store/actions/dashboardActions';
import * as d3 from 'd3';
import $ from 'jquery';
import WOW from 'wowjs';
import {NavLink} from 'react-router-dom';

class Dashboard extends React.Component{

    componentDidMount(){
        this.props.fetchDashboard(this.props.authres.token);
        var wow = new WOW.WOW();
        wow.init();
    }

    componentDidUpdate(){
        const {dashboard={}} = this.props;
        d3.select('.svgbvi').remove();
        this.drawBvIChart(dashboard.bugs,dashboard.featurerequests);
    }

    drawBvIChart =(bugs,features) =>{
        var height = $('.bvi').height();
        var width = $('.bvi').width();
        var radius = Math.min(width,height)/2;
        var data = [bugs,features];
        // var data = [{type:"bugs",value:bugs},{type:"features",value:features}];
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        var arc = d3.arc().outerRadius(radius).innerRadius(radius-20);
        var pie = d3.pie().sort(null).value(function(d){return d;});

        var svg = d3.select('.bvi').append('svg').attr('class','svgbvi').attr('height',height).attr('width',width).append('g').attr('transform',`translate(${width/2},${(height/2)})`);
        var chart = svg.selectAll(".arc").data(pie(data)).enter().append('g').attr('class','arc');
        
        chart.append("path").attr("d",arc)
        .style("fill",function(d){return color(d.data);});

    }


    render(){
        const {dashboard ={}} = this.props;
        return(
            <div className="app-content dashboard">
            <Grid stackable>
                <Grid.Row className="firstrow">
                <Grid.Column width={4}>
                    <Card className="wow slideInLeft" data-wow-duration="300ms">
                        <Card.Header>
                            Issues
                        </Card.Header>
                        <Card.Content>
                            {dashboard.totalissues}
                        </Card.Content>
                        <Card.Content className="iconcontent">
                        <Icon name="exclamation circle"></Icon>
                        </Card.Content>
                        <Card.Content extra>
                        Total issues submitted
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Card className="wow fadeIn">
                        <Card.Header>
                            Bugs reported vs Feature requests
                        </Card.Header>
                        <Card.Content className="bvi">
                        {/* Chart goes here */}
                        
                        </Card.Content>
                        <Card.Content className="iconcontent">
                        <Icon name="chart pie"></Icon>
                        </Card.Content>
                        <Card.Content extra>
                        Bug and Feature distribution
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={4} >
                    <Card className="fadeIn">
                        <Card.Header>
                            Community
                        </Card.Header>
                        <Card.Content>
                            {dashboard.community}
                        </Card.Content>
                        <Card.Content className="iconcontent">
                        <Icon name="users"></Icon>
                        </Card.Content>
                        <Card.Content extra>
                        Population of the community
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Card className="" data-wow-duration="300ms">
                        <Card.Header>
                            Solved
                        </Card.Header>
                        <Card.Content>
                            {dashboard.solved}
                        </Card.Content>
                        <Card.Content className="iconcontent">
                        <Icon name="check circle outline"></Icon>
                        </Card.Content>
                        <Card.Content extra>
                        Total solved issues
                        </Card.Content>
                    </Card>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}>
                    <Card className="latestissues" data-wow-duration="300ms">
                        <Card.Header>
                            Latest issues
                        </Card.Header>
                        {dashboard.latestissues ?<div>
                            {dashboard.latestissues.map(issue =>(
                                <NavLink to={`/unicornattractor/issues/${issue.id}`}>
                            <Card.Content className="latestissue">
                                {issue.title}
                            </Card.Content>
                            </NavLink>
                        ))}
                        </div> :null}
                    </Card>
                    </Grid.Column>
                    <Grid.Column width={8}>
                    <Card className="comingfeatures" data-wow-duration="300ms">
                    <Card.Header>Coming soon (Most voted for features)</Card.Header>
                        {dashboard.topfeatures ? <div>
                            {dashboard.topfeatures.map(feature =>(
                                <Card.Content>
                                    <span className="ftitle">{feature.title}</span><span className="votes">{feature.votes}</span>
                                </Card.Content>
                        ))}
                        </div>:null}
                    </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </div>
        );
    }
}

const mapStateToProps =state => {
    return{
        dashboard:state.dashboard.dashboard,
        authres:state.user.authres
    }
}

export default connect(mapStateToProps,{fetchDashboard})(Dashboard);