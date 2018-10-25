import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '~/scenes/Auth/actions';
import { hot } from 'react-hot-loader';

@hot(module)
@connect((state) => ({
	auth: state.auth
}), actions)
export default class extends Component
{
	async componentDidMount()
	{
		await this.props.logout();
		await this.props.signin({login:'demo', password:'demo'});
	}

	render()
	{
		const { authorized } = this.props.auth.entities;

		if (authorized)
			return <Redirect to="/" />;

		return null;
	}
}