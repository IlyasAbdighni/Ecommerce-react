import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
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
import { Link } from "react-router-dom";

import Items from "./item-list/Items";
import Footer from "./Footer";
import { ApiClient } from "../utils/ApiClient";
import axios from "axios";
import ProductList from "./ProductList";
import { PRODUCT_LIST } from "./Products";

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <h1
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "0.5em"
      }}
    >
      Welcome to Online shop
    </h1>
    <h2
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
    >
      A project dedicated to study web programming.
    </h2>
    <Button as={Link} to="/products" primary size="huge">
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
            style={{ padding: "1em 0em" }}
            vertical
          >
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
            // style={{ minHeight: "100vh" }}
          >
            <Segment
              inverted
              textAlign="center"
              // style={{ minHeight: 350, padding: "1em 0em" }}
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

class HomepageLayout extends Component {
  state = {
    products: [],
    loading: true,
    message: null
  };

  componentDidMount() {
    ApiClient.homeProducts()
      .then(res => {
        this.setState({
          loading: !res.data.success,
          products: PRODUCT_LIST,
          message: null
        });
      })
      .catch(e => {
        this.setState({
          loading: true,
          products: [],
          message: "Could not load the data"
        });
      });
  }

  render() {
    const { message, loading, products } = this.state;

    return (
      <ResponsiveContainer>
        <Segment vertical>
          <Container>
            <Header as="h3" style={{ fontSize: "2em", textAlign: "center" }}>
              Best selling products
            </Header>
            {message ? (
              <div>{message}</div>
            ) : (
              <Fragment>
                {products.length > 0 ? (
                  <div>
                    <ProductList products={products} />
                    <div
                      style={{
                        textAlign: "center",
                        padding: "0 20%"
                      }}
                    >
                      <Button
                        as={Link}
                        to="/products"
                        size="large"
                        style={{ width: "100%" }}
                      >
                        See more
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>There are no products yet!</div>
                )}
              </Fragment>
            )}
          </Container>
        </Segment>
      </ResponsiveContainer>
    );
  }
}

export default HomepageLayout;
