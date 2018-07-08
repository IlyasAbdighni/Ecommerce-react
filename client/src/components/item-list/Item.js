import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

const formatDate = (date) => {
	const newDate = new Date(date);
	return newDate.toLocaleDateString();
}

export default ({product}) => {
	return (
		<Card className="item-container">
			<Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
			<Card.Content>
				<Card.Header>{product.name}</Card.Header>
				<Card.Meta>
					<span className="date">Added in {formatDate(product.createdAt)}</span>
				</Card.Meta>
			</Card.Content>
			<Card.Content extra>
				<Icon name="dollar" />
				{product.price}
			</Card.Content>
		</Card>
	);
};
