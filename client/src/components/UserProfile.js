import React from 'react';
import {Header, Icon, Segment, Container, Table, Label, Menu} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {authenticateUser} from '../actions/user';
import {ApiClient} from '../utils/ApiClient';

class UsersList extends React.Component {

  state = {users: null}

  componentDidMount() {
    ApiClient.getAllUsers()
      .then(res => this.setState({ users: res.data.users }))
      .catch(e => console.log(e))
  }

  render () {
    const {users} = this.state;
    if (users) {
      return (
        <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map((user, i) => (
            <Table.Row key={i}>
              <Table.Cell><Label ribbon>{user.email}</Label></Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      )
    } else {
      return null;
    }
  }
}

class UserProfile extends React.Component {

  state = {user: null}

  componentDidMount() {
    this.props.dispatch(authenticateUser());
    this.setState({ user: this.props.user && this.props.user.user })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.user.user })
  }

  render() {
    const {user} = this.state;
    return (
      <Container>
        <Segment>
          <Header as='h2' icon textAlign='center' style={{ marginBottom: '20px' }} >
            <Icon name='users' circular />
            <Header.Content>{}</Header.Content>
          </Header>
          <Container style={{ marginBottom: '20px' }} textAlign='center'>User email: <strong>{user && user.email && user.email}</strong></Container>
          <Container style={{ marginBottom: '20px' }} textAlign='center'>User role: <strong>{user && user.role && user.role}</strong></Container>
          {user && user.role === 'Admin' && <UsersList />}
        </Segment>
      </Container>

    )
  }
}

const mapStateToProps = ({user}) => {
  return {user};
}

export default connect(mapStateToProps)(UserProfile);
