import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import * as actions from '~/scenes/Auth/actions';
import AppLoader from '~/modules/AppLoader';

import DemoScene from '~/scenes/Demo';
import AuthScene from '~/scenes/Auth';
import SignupScene from '~/scenes/Auth/Signup';
import DashboardScene from '~/scenes/Dashboard';

import { sendPushAboutAuth } from '~/api';

type Props = {};

@hot(module)
@connect((state) => ({
    auth: state.auth
}), actions)
export default class extends Component<Props>
{
    state = {
        isReady: false
    };

    async componentDidMount()
    {
        await this.props.checkAuth().then(() => {
            if (this.props.auth.entities.authorized) {
                sendPushAboutAuth();
            }
        });
        this.setState({ isReady: true });
    }

    render()
    {
        if (!this.state.isReady)
            return <AppLoader />;

        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/demo" component={DemoScene} />
                    <Route path="/signup" component={SignupScene} />
                    <Route path="/auth" component={AuthScene} />
                    <Route path="/" component={DashboardScene} />
                </Switch>
            </BrowserRouter>
        );
    }
}
