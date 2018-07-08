import React from "react";
import { Grid, Container } from "semantic-ui-react";
import {ApiClient} from '../../utils/ApiClient';
import Item from "./Item";
import axios from 'axios';

const mapProducts = (products) => {
	if(Array.isArray(products) && products.length > 0) {
		return products.map((product, i) => {
			return (
				<Grid.Column key={i}>
					<Item product={product} />
				</Grid.Column>
			)
		})
	}
	return <div style={{ textAlign: 'center' }} >There are no products yet.</div>
}

const Items = ({products, ...props}) => {
		return (
			<Container>
				<Grid container columns={3}>
					{mapProducts(products)}
				</Grid>
			</Container>
		);
}

export default Items;
