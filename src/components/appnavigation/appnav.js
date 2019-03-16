import React from 'react';
import './appnav.css';
import {Card,Image,Icon,Button} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

// icons
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import LibraryAddRoundedIcon from '@material-ui/icons/LibraryAddRounded';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooksRounded';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import QueueIcon from '@material-ui/icons/Queue';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';

export default class AppNavigation extends React.Component{
    render(){
        return(
            <div className="appnavigation">
            <div className="nav">
            <Card className="nav">

            <NavLink to="/unicornattractor/dashboard">
            <Card.Content>
                <div className="link">
                <DashboardRoundedIcon className="icon"/>
                Dashboard
                </div>
            </Card.Content>
            </NavLink>

            <NavLink to="/unicornattractor/createissue">
            <Card.Content>
                <div className="link">
                <LibraryAddRoundedIcon className="icon"/>
                Create issue
                </div>
            </Card.Content>
            </NavLink>

            <NavLink to="">
            <Card.Content>
                <div className="link">
                <LibraryBooksIcon className="icon"/>
                Created by me
                </div>
            </Card.Content>
            </NavLink>

            <NavLink to="">
            <Card.Content>
                <div className="link">
                <AccountBoxRoundedIcon className="icon"/>
                Assigned to me
                </div>
            </Card.Content>
            </NavLink>

            <NavLink to="/unicornattractor/issues">
            <Card.Content>
                <div className="link">
                <QueueIcon className="icon"/>
                Issues
                </div>
            </Card.Content>
            </NavLink>

            <NavLink to="">
            <Card.Content>
                <div className="link">
                <ArrowUpwardRoundedIcon className="icon"/>
                Top voted features
                </div>
            </Card.Content>
            </NavLink>
            
            </Card>
            </div>
            </div>
        );
    }
}