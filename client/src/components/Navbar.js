import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import Auth from "../utils/Auth";
import { authenticateUser } from "../actions/user";
import { ApiClient } from "../utils/ApiClient";
import { connect } from "react-redux";

const renderUserMenu = (user, pathname, logOut) => {
  if (user && user.authenticated) {
    return (
      <React.Fragment>
        {user.user.role === "Admin" && (
          <Menu.Item
            as={Link}
            to="/admin/product/add"
            name="Add a new product"
            active={pathname === "/admin/product/add"}
            position="right"
          />
        )}

        <Menu.Item
          as={Link}
          to="/account"
          name={user.user.role === "Admin" ? "admin" : user.user.email}
          active={pathname === "/admin" || pathname === "/user/cart"}
          position="right"
        />

        <Menu.Item name="logout" onClick={logOut} position="right" />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Menu.Item
        as={Link}
        to="/login"
        name="login"
        active={pathname === "/login"}
        position="right"
      />
      <Menu.Item
        as={Link}
        to="/register"
        name="register"
        active={pathname === "/register"}
      />
    </React.Fragment>
  );
};

class Navbar extends Component {
  state = { user: null, authenticated: false };

  componentDidMount() {
    this.props.dispatch(authenticateUser());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.authenticated) {
      this.setState({
        user: nextProps.user,
        authenticated: nextProps.user.authenticated
      });
    }
  }

  logOut = () => {
    Auth.deauthenticateUser();
    window.location = window.location.origin + "/login";
  };

	render() {
		const {user} = this.state;
		return (
			<Segment inverted>
				<Menu inverted pointing secondary>
					<Menu.Item
						as={Link}
						to="/"
						name="home"
						active={this.pathname === "/"}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name="products"
						as={Link}
						to="/products"
						active={this.pathname === "/products"}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name="About"
						as={Link}
						to="/about"
						active={this.pathname === "/about"}
						onClick={this.handleItemClick}
					/>
				{renderUserMenu(user, this.pathname, this.logOut)}

				</Menu>
			</Segment>
		);
	}
}

export default connect(({ user }) => ({ user }))(Navbar);
