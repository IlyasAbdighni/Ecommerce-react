import React from "react";
import {
	Button,
	Form,
	Grid,
	Message,
	Segment,
  Header
} from "semantic-ui-react";
import {ApiClient} from '../../utils/ApiClient';
import {Redirect} from 'react-router-dom';

class Login extends React.Component {

  state = {
    email: null,
    password: null,
		confirm_password: null,
    registrationSuccessfull: false,
		error: null
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
			case 'confirm_password':
				this.setState({ confirm_password: event.target.value });
				break;
			default:
				break;
		}
	}

	validate = async () => {
		const {password, confirm_password} = this.state;

		if (password === confirm_password) {
				return Promise.resolve();
		}
		return Promise.reject('Passwords don\'t matach');

	}

	handleSubmit = (event) => {
		console.log('this.state: ', this.state);
		const {email, password, error} = this.state;
		const self = this;
		this.validate()
			.then(() => {
				ApiClient.register(email, password)
					.then(res => {
						self.setState({registrationSuccessfull: res.data.success, error: res.data.message})

					})
					.catch(e => this.setState(() => ({ error: e.data.message, registrationSuccessful: false })))
			}).catch(e => {
				console.log(e);
					// this.setState({ error: e })
			})
	}

  render() {

		const {registrationSuccessfull} = this.state;

		if(registrationSuccessfull) {
			return <Redirect to='/login' />
		} else {
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
							Registration form
						</Header>
						{this.state.error && <Message color='red'>{this.state.error}</Message>}
							<Form size="large" onSubmit={this.handleSubmit} >
								<Segment stacked>
									<Form.Input
										name='email'
										fluid
										icon="user"
										iconPosition="left"
										placeholder="E-mail address"
										required
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
										required
										onChange={this.handleChange}
									/>

									<Form.Input
										name='confirm_password'
										fluid
										icon="lock"
										iconPosition="left"
										placeholder="Confirm the password"
										type="password"
										required
										onChange={this.handleChange}
									/>

									<Button color="teal" fluid size="large">
										Register
									</Button>
								</Segment>
							</Form>
						</Grid.Column>
					</Grid>
				</div>
			);
		}

  }

};

export default Login;
