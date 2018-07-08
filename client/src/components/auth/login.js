import React, {Component} from "react";
import {
	Button,
	Form,
	Grid,
	Message,
	Segment,
	Header
} from "semantic-ui-react";
import {Redirect} from 'react-router-dom';
import {ApiClient} from '../../utils/ApiClient';
import Auth from '../../utils/Auth';
import {connect} from 'react-redux';
import {authenticateUser} from '../../actions/user';

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Login extends Component {

	state = {
		email: null,
		password: null,
		loginSuccessful: false,
		error: null,
		user: null,
		authenticated: false
	}

	componentDidMount() {
		this.props.dispatch(authenticateUser());
	}

	componentWillReceiveProps(nextProps) {
		console.log("************ Login page componentWillReceiveProps **************", nextProps);
		if(nextProps.authenticated === true) {
			this.setState({ authenticated: true })
		}
	}

	handleChange = (event) => {
		const {email, password} = event.target;
		switch (event.target.name) {
			case 'email':
				this.setState({ email: event.target.value })
				break;
			case 'password':
				this.setState({ password: event.target.value });
				break;
			default:
				break;
		}
	}

	validate = async () => {
		const {email, password} = this.state;
		if(!email && !validateEmail(email)) {
			return Promise.reject('Please provide a correct email');
		}
		if(!password) {
			return Promise.reject('Please provide a password')
		}
		return Promise.resolve();
	}

	handleSubmit = (event) => {
		const {email, password, error} = this.state;
		const self = this;
		this.validate()
			.then(() => {
				ApiClient.login(email, password)
					.then(res => {
						if(res.data.success) {
							Auth.saveToken(res.data.token);
						}
						self.setState({loginSuccessful: res.data.success, error: res.data.message})

					})
					.catch(e => this.setState(() => ({ error: e.data.message, loginSuccessful: false })))
			}).catch(e => {
					this.setState({ error: e })
			})
	}

	render() {

		const {loginSuccessful, user, authenticated} = this.state;

		if(loginSuccessful || authenticated) {
			return <Redirect to='/account' />
		}
		else {
			return (
				<div className="login-form">
					{/*
						Heads up! The styles below are necessary for the correct render of this example.
						You can do same with CSS, the main idea is that all the elements up to the `Grid`
						below must have a height of 100%.
					*/}
					<style>{`
						body > div,
						body > div > div,
						body > div > div > div.login-form {
							height: 70%;
						}
					`}</style>
					<Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
						<Grid.Column style={{ maxWidth: 450 }}>
							<Header as='h3' textAlign='center'>
								Login form
							</Header>
							{this.state.error && <Message color='red'>{this.state.error}</Message>}
							<Form onSubmit={this.handleSubmit} size="large">
								<Segment stacked>
									<Form.Input
										name='email'
										fluid
										icon="user"
										iconPosition="left"
										placeholder="E-mail address"
										type='email'
										onChange={this.handleChange}
									/>
									<Form.Input
										name='password'
										fluid
										icon="lock"
										iconPosition="left"
										placeholder="Password"
										type="password"
										onChange={this.handleChange}
									/>

									<Button color="teal" fluid size="large">
										Login
									</Button>
								</Segment>
							</Form>
							<Message>
								New to us? <a href="/register">Sign Up</a>
							</Message>
						</Grid.Column>
					</Grid>
				</div>
			)
		}
	}
};

export default connect(({user}) => ({user: user.user, authenticated: user.authenticated}))(Login);
