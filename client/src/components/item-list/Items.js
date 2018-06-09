import React from "react";
import { Grid, Container } from "semantic-ui-react";

import Item from "./Item";

class Items extends React.Component {
	render() {
		return (
			<Container>
				<h3>This is home</h3>
				<Grid container columns={3}>
					{[1, 2, 3].map(i => (
						<Grid.Column key={i}>
							<Item />
						</Grid.Column>
					))}
				</Grid>
			</Container>
		);
	}
}

export default Items;
