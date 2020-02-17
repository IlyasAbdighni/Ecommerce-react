import React from "react";
import { Segment, Container, Grid, List, Header } from "semantic-ui-react";

export default () => (
  <Segment inverted vertical >
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <h3> About </h3>
            <List link inverted>
              <List.Item as="a">Home</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <h4 inverted>Footer Header</h4>
            <p>This is a project for study Web Programming.</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);
