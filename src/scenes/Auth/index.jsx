import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import SignInScene from './SignIn';
import { sendPushAboutAuth } from '~/api';

import { Wrapper, Content, Logo } from "./styles";


const Auth = ({auth}) => {
    if (auth.entities.authorized) {
        sendPushAboutAuth();
        return <Redirect to="/" />;
    }

    return (
        <Wrapper>
            <Content>
                <Logo><img src="/assets/images/logoauth.png" alt="Hashman" width={150} /></Logo>
                <Switch>
                    <Route path={`/auth`} component={SignInScene} />
                </Switch>
            </Content>
        </Wrapper>
    );
}   

function mapStateToProps(state) {
    return {auth: state.auth}
}
export default connect(mapStateToProps)(Auth);
