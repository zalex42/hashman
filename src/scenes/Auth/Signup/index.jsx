import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import Button from "~/components/Button";
import { Input } from '~/components/Form';
import Loader from '~/components/Loader';
import { Form, Inline, Required, Wrapper, Content, Logo, Link } from '../styles';
import * as actions from '../actions';


type Props = {};

@hot(module)
@connect((state) => ({
    auth: state.auth
}), actions)
export default class extends Component<Props>
{
    state = {
        login: '',
        password: '',
		email: '',
		repassword: ''
    };

    signupHandler = async () => {
		if (this.state.password === this.state.repassword) {
        	await this.props.signup({ login: this.state.login, password: this.state.password, email: this.state.email });
			if (this.props.auth.entities.authorized) {
				this.props.history.push('/auth');
			}
		}
    };

	getError = (field) => {
		let result = null;

		const { message } = this.props.auth.error;

		if (Array.isArray(message)) {
			message.map((item) => {
				if (item.name === field) result = item.errorText;
			})
		}

		return result;
	};

	getPasswordError = () => {
		if (this.state.repassword && this.state.password !== this.state.repassword)
			return 'Пароли не совпадают'
	};

    render()
    {
        const { loading } = this.props.auth.pending;

        return (
			<Wrapper>
				<Content>
					<Logo><img src="/assets/images/logo.svg" alt="Hashman" width={150} /></Logo>
					<Loader loading={loading} style={{ height: 'auto' }} transparent={0.4}>
						<Form>
							<Input type="text" error={this.getError('login')} placeholder="Логин" onChange={(e) => this.setState({ login: e.target.value })} value={this.state.login} />
							<Input type="password" error={this.getError('password')} placeholder="Пароль" onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} />
							<Input type="password" error={this.getPasswordError()} placeholder="Повторите пароль" onChange={(e) => this.setState({ repassword: e.target.value })} value={this.state.repassword} />
							<Input type="email" error={this.getError('email')} placeholder="E-mail" onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} />
							<Inline>
								<Required>Все поля обязательны</Required>
								<Button type="primary" onClick={this.signupHandler}>Зарегистрироваться</Button>
							</Inline>
							<Link to="/auth">Войти</Link>
						</Form>
					</Loader>
				</Content>
			</Wrapper>
        );
    }
}