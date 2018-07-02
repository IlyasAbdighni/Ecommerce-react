import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";

export default class Navbar extends Component {
	state = { activeItem: "home" };

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	render() {
		const { activeItem } = this.state;

		return (
			<Segment inverted>
				<Menu inverted pointing secondary>
					<Menu.Item
						as="a"
						href="/"
						name="home"
						active={activeItem === "home"}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name="messages"
						active={activeItem === "messages"}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name="friends"
						active={activeItem === "friends"}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						as="a"
						href="/login"
						name="login"
						active={activeItem === "login"}
						onClick={this.handleItemClick}
						position="right"
					/>
					<Menu.Item
						as="a"
						href="/register"
						name="register"
						active={activeItem === "register"}
						onClick={this.handleItemClick}
					/>
				</Menu>
			</Segment>
		);
	}
}
