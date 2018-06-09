import React from "react";
import { connect } from "react-redux";
import Items from "./item-list/Items";

export default connect()(props => {
	return (
		<div>
			<Items />
		</div>
	);
});
