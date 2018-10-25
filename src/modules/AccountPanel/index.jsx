import React, { Component } from 'react';
import * as AccountPanel from './styles';
import { hot } from 'react-hot-loader';
import { Redirect } from 'react-router-dom';

@hot(module)
export default class extends Component
{
    state = {
        authorized: true
    };

    render()
    {
        if (!this.state.authorized)
            return <Redirect to="/auth" />;

        return (
            <AccountPanel.Wrapper>
                <AccountPanel.Username>{ this.props.fullname }</AccountPanel.Username>
                <AccountPanel.Logout onClick={async () => { this.props.logout(); this.setState({ authorized: false }) }} />
            </AccountPanel.Wrapper>
        );
    }
}