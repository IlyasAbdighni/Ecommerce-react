import React from "react";
import { Segment, Container, Grid, List, Header } from "semantic-ui-react";

export default () => (
	<Segment inverted vertical style={{ padding: "5em 0em", marginTop: '40px' }}>
		<Container>
			<Grid divided inverted stackable>
				<Grid.Row>
					<Grid.Column width={3}>
						<Header inverted as="h4" content="About" />
						<List link inverted>
							<List.Item as="a">Home</List.Item>
						</List>
					</Grid.Column>
					<Grid.Column width={7}>
						<Header as="h4" inverted>
							Footer Header
						</Header>
						<p>This is a project for study Web Programming.</p>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Container>
	</Segment>
);
