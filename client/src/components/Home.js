import PropTypes from "prop-types";
import React, { Component } from "react";
import {
	Button,
	Container,
	Divider,
	Grid,
	Header,
	Icon,
	Image,
	List,
	Menu,
	Responsive,
	Segment,
	Sidebar,
	Visibility
} from "semantic-ui-react";

import Items from "./item-list/Items";
import Footer from "./Footer";

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
	<Container text>
		<Header
			as="h1"
			content="Welcome to Udunig Online shop"
			inverted
			style={{
				fontSize: mobile ? "2em" : "4em",
				fontWeight: "normal",
				marginBottom: 0,
				marginTop: mobile ? "1.5em" : "3em"
			}}
		/>
		<Header
			as="h2"
			content="A project dedicated to the web programming course."
			inverted
			style={{
				fontSize: mobile ? "1.5em" : "1.7em",
				fontWeight: "normal",
				marginTop: mobile ? "0.5em" : "1.5em"
			}}
		/>
		<Button as="a" href="/products" primary size="huge">
			Go to product page
			<Icon name="right arrow" />
		</Button>
	</Container>
);

HomepageHeading.propTypes = {
	mobile: PropTypes.bool
};

class DesktopContainer extends Component {
	state = {};

	hideFixedMenu = () => this.setState({ fixed: false });
	showFixedMenu = () => this.setState({ fixed: true });

	render() {
		const { children } = this.props;
		const { fixed } = this.state;

		return (
			<Responsive {...Responsive.onlyComputer}>
				<Visibility
					once={false}
					onBottomPassed={this.showFixedMenu}
					onBottomPassedReverse={this.hideFixedMenu}
				>
					<Segment
						inverted
						textAlign="center"
						style={{ minHeight: 700, padding: "1em 0em" }}
						vertical
					>
						<Menu
							fixed={fixed ? "top" : null}
							inverted={!fixed}
							pointing={!fixed}
							secondary={!fixed}
							size="large"
						>
							<Container>
								<Menu.Item as="a" active>
									Home
								</Menu.Item>
								<Menu.Item as="a">Work</Menu.Item>
								<Menu.Item as="a">Company</Menu.Item>
								<Menu.Item as="a">Careers</Menu.Item>
								<Menu.Item position="right">
									<Button as="a" href="/login" inverted={!fixed}>
										Log in
									</Button>
									<Button
										as="a"
										href="/register"
										inverted={!fixed}
										primary={fixed}
										style={{ marginLeft: "0.5em" }}
									>
										Sign Up
									</Button>
								</Menu.Item>
							</Container>
						</Menu>
						<HomepageHeading />
					</Segment>
				</Visibility>

				{children}
			</Responsive>
		);
	}
}

DesktopContainer.propTypes = {
	children: PropTypes.node
};

class MobileContainer extends Component {
	state = {};

	handlePusherClick = () => {
		const { sidebarOpened } = this.state;

		if (sidebarOpened) this.setState({ sidebarOpened: false });
	};

	handleToggle = () =>
		this.setState({ sidebarOpened: !this.state.sidebarOpened });

	render() {
		const { children } = this.props;
		const { sidebarOpened } = this.state;

		return (
			<Responsive {...Responsive.onlyMobile}>
				<Sidebar.Pushable>
					<Sidebar
						as={Menu}
						animation="uncover"
						inverted
						vertical
						visible={sidebarOpened}
					>
						<Menu.Item as="a" active>
							Home
						</Menu.Item>
						<Menu.Item as="a">Work</Menu.Item>
						<Menu.Item as="a">Company</Menu.Item>
						<Menu.Item as="a">Careers</Menu.Item>
						<Menu.Item as="a">Log in</Menu.Item>
						<Menu.Item as="a">Sign Up</Menu.Item>
					</Sidebar>

					<Sidebar.Pusher
						dimmed={sidebarOpened}
						onClick={this.handlePusherClick}
						style={{ minHeight: "100vh" }}
					>
						<Segment
							inverted
							textAlign="center"
							style={{ minHeight: 350, padding: "1em 0em" }}
							vertical
						>
							<Container>
								<Menu inverted pointing secondary size="large">
									<Menu.Item onClick={this.handleToggle}>
										<Icon name="sidebar" />
									</Menu.Item>
									<Menu.Item position="right">
										<Button as="a" inverted>
											Log in
										</Button>
										<Button as="a" inverted style={{ marginLeft: "0.5em" }}>
											Sign Up
										</Button>
									</Menu.Item>
								</Menu>
							</Container>
							<HomepageHeading mobile />
						</Segment>

						{children}
					</Sidebar.Pusher>
				</Sidebar.Pushable>
			</Responsive>
		);
	}
}

MobileContainer.propTypes = {
	children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
	<div>
		<DesktopContainer>{children}</DesktopContainer>
		<MobileContainer>{children}</MobileContainer>
	</div>
);

ResponsiveContainer.propTypes = {
	children: PropTypes.node
};

const HomepageLayout = () => (
	<ResponsiveContainer>
		<Segment style={{ padding: "8em 0em" }} vertical>
			<Container text>
				<Header as="h3" style={{ fontSize: "2em", textAlign: "center" }}>
					Best selling products
				</Header>
				<Items />
				<div style={{ width: "100%", height: "20px" }} />
				<div style={{ display: "flex", justifyContent: "center" }}>
					<Button as="a" href="/products" size="large">
						See more
					</Button>
				</div>
			</Container>
		</Segment>
	</ResponsiveContainer>
);

export default HomepageLayout;
