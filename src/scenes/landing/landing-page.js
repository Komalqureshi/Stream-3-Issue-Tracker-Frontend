import React from 'react';
import './landing.css';
import {Grid,Header, Card,Label, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {fetchLandingData} from '../../services/store/actions/issueActions';
import {Redirect} from 'react-router-dom';
import WOW from 'wowjs';
import $ from 'jquery';
import Navbar from '../../components/navbar/navbar';
import * as d3 from 'd3';
import SignUp from '../../components/signup/signup';

class Variety extends React.Component{

    componentDidUpdate(){
        var data = {
            bugs:this.props.data.bugs,
            features:this.props.data.features,
            users:this.props.data.users
        }
        this.drawChart(data);
    }

    drawChart = (object) => {
        var data = [object.bugs,object.features,object.users];
        var width = 300;
        var height = 300;
        var radius = Math.min(width,height)/2;
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        var arc = d3.arc().outerRadius(radius).innerRadius(0);
        var pie = d3.pie().sort(null).value(function(d){return d;});


        var svg = d3.select('.variety').append('svg').attr('width',width).attr('height',height)
        .append('g').attr('transform',`translate(${width/2},${(height/2)})`);
        var chart = svg.selectAll('.arc').data(pie(data)).enter().append('g').attr('class','arc');

        chart.append('path').attr('d',arc)
        .attr('stroke','white')
        .attr('class','pie')
        .style('fill',function(d){return color(d.data);});
    }
    render(){
        return(
            <div className="variety"></div>
        );
    }
}

class Upvotes extends React.Component{

    componentDidUpdate(){
        var data = {
            bugvotes:this.props.data.bugupvotes,
            featurevotes:this.props.data.featurevotes
        }
        console.log(data);
        this.drawChart(data);
    }

    drawChart = (object) =>{
        var data = [{
            type:"Bugs",
            votes:object.bugvotes
        },{
            type:"Features",
            votes:object.featurevotes
        }];
        var max = Math.max.apply(Math,data.map((d) => d.votes));
        var width = 300;
        var height = 300;
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        var xScale = d3.scaleBand().range([0,width-100]).domain(data.map(d => d.type)).padding(.2);
        var yScale = d3.scaleLinear().range([height-30,0]).domain([0,max]);

         var svg = d3.select('.upvotes').append('svg').attr('width',width).attr('height',height).append('g')
         .attr('class','upcht').attr('transform','translate(50,5)');

        //  Add axes
        svg.append('g').attr('transform',`translate(0,${height-30})`).call(d3.axisBottom(xScale));
        svg.append('g').call(d3.axisLeft(yScale));

        var div = d3.select('.upcht').append('div').attr('class','tooltip').style('opacity',0);


        // Add rectangles
        svg.selectAll().data(data).enter()
        .append('rect')
        .attr('class','rect')
        .attr('x',d => xScale(d.type))
        .attr('y',d => yScale(d.votes))
        .attr('width',xScale.bandwidth())
        .attr('fill',d => color(d.type))
        .attr("height",d => (height-30) - yScale(d.votes))
        .on('mouseenter',function(d){
            div.transition()
            .duration(200)
            .style('opacity',.9);
            div.html(d.votes +" votes")
        });

    }

    render(){
        return(
            <div className="upvotes">
            </div>
        );
    }
}

class Status extends React.Component{

    componentDidMount(){
        var data = {
            open:this.props.data.open,
            reopen:this.props.data.reopen,
            closed:this.props.data.closed
        }
        this.drawChart(data)
    }

    drawChart = (object) =>{
        var data =[
            {
                status:"Open",
                value:object.open
            },
            {
                status:"Reopen",
                value:object.reopen
            },
            {
                status:"Closed",
                value:object.closed
            }
        ]
        console.log(data);
        var width = 300;
        var height = 300;
        var radius = Math.min(width,height)/2;
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        var arc = d3.arc().outerRadius(radius).innerRadius(0);
        var pie = d3.pie().sort(null).value(function(d){return d.value;});


        var svg = d3.select('.status').append('svg').attr('width',width).attr('height',height)
        .append('g').attr('transform',`translate(${width/2},${(height/2)})`);
        var chart = svg.selectAll('.arc').data(pie(data)).enter().append('g').attr('class','arc');

        var tooltip = d3.select('.pie').append('div').attr('class','tooltip');
        tooltip.append('div').attr('class','label');
        tooltip.append('div').attr('class','count');
        tooltip.append('class','percent');

        chart.append('path').attr('d',arc)
        .attr('class','pie')
        .attr('stroke',"white")
        .style('fill',function(d){return color(d.data.status);})
        .on('mouseover',function(d){
            tooltip.select('.label').html(d.status).style('color','black');
            tooltip.select('.count').html(d.value);
            tooltip.style('display','block');
            tooltip.style('opacity',2);
        })
        .on('mouseout',function(){
            tooltip.style('display','none');
            tooltip.style('opacity',0);
        });

    }

    render(){
        return(
            <div className="status"></div>
        );
    }
}

class LandingPage extends React.Component{

    componentDidMount(){
        var wow = new WOW.WOW();
        wow.init();
        this.props.fetchLandingData();
    }

    showSignUp=()=>{
        $('.signupcontainer').removeClass('hide');
    }

    closeSignUp =() =>{
        $('.signupcontainer').addClass('hide');
    }

    render(){
        const {authres={},landingpagedata={}} = this.props;
        if(authres.loggedIn === true){
            return <Redirect to="/unicornattractor/dashboard"/>
        }
        return(
            <Navbar>
            <div className="landing" onClick={e => this.closeSignUp}>
            <Grid columns="three" stackable>
                <Grid.Row>
                    <Card className="intro">
                        <Card.Header>
                        <Header as="h1">Welcome to Unicorn Attractor</Header>
                        </Card.Header>
                        <Card.Content>
                        <Header as='h3'>Where technology has a voice</Header>
                        <Header as="h3">Join our community to share bugs and request for features.</Header>
                        <SignUp elclass="centered"/>
                        </Card.Content>
                    </Card>
                </Grid.Row>
                <Grid.Row className="whatwedo">
                <Card>
                    <Card.Header>
                        <Icon name="user"/>
                    </Card.Header>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h1">Online community</Header>
                            <p className="onlinedesc">Our online community allows users to share bugs, request for features and find quick 
                                solutions to issues they face as they use out software.
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Card>
                </Grid.Row>
                <Grid.Row className="chartrow">
                    <Grid.Column>
                    <Card>
                        <Card.Header>
                            Variety
                        </Card.Header>
                        <Card.Content>
                            <Variety data={landingpagedata}/>
                        </Card.Content>
                        <Card.Content extra>
                        <Label color="green">Users</Label>
                        <Label color="blue">Bugs</Label>
                        <Label color="orange">Features</Label>
                        </Card.Content>
                    </Card>
                    </Grid.Column>
                    <Grid.Column>
                    <Card>
                        <Card.Header>
                            Upvotes
                        </Card.Header>
                        <Card.Content>
                            <Upvotes data={landingpagedata}/>
                        </Card.Content>
                        <Card.Content extra>
                        Number of votes for features and bugs
                        </Card.Content>
                    </Card>
                    </Grid.Column>
                    <Grid.Column>
                    <Card>
                        <Card.Header>
                            Ticket status
                        </Card.Header>
                        <Card.Content>
                            <Status data={landingpagedata}/>
                        </Card.Content>
                        <Card.Content extra>
                    <Label color="blue">Open</Label>
                    <Label color="orange">Reopen</Label>
                    <Label color="orange">Closed</Label>
                    </Card.Content>
                    </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid stackable>
                <Grid.Row className="lastrow">
                <Grid.Column width={8}>
                <Card>
                        <Card.Content>
                            <Icon name="bell"/>
                        </Card.Content>
                        <Card.Header>
                            Ask for new features
                        </Card.Header>
                        <Card.Content>
                            Describe a feature you want added to Unicorn Attractor and share it!
                        </Card.Content>
                        <Card.Content>
                            If your feature is cool, other users will upvote it and you'll be seeing it in our next update!
                        </Card.Content>
                </Card>
                </Grid.Column>
                <Grid.Column width={8}>
                <Card>
                    <Card.Content>
                        <Icon name="bug"/>
                    </Card.Content>
                    <Card.Header>
                        Report bugs
                    </Card.Header>
                    <Card.Content>
                        You came across some ubnormal or unintended behaviour with our software
                    </Card.Content>
                    <Card.Content>
                        Post the bug to the community and it will be followed until its fixed!
                    </Card.Content>
                </Card>
                </Grid.Column>
                </Grid.Row>
            </Grid>
            </div>
            </Navbar>
        );
    }
}

const mapStateToProps = state => {
    return{
        authres:state.user.authres,
        landingpagedata:state.issues.landingpagedata
    }
}

export default connect(mapStateToProps,{fetchLandingData})(LandingPage);