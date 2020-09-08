import React, { useEffect } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { useRouteMatch, Link } from "react-router-dom";
import ProductsList from "./ProductsList/ProductsList";
import AddIcon from "@material-ui/icons/Add";
import { getProducts } from "../../store/actions/products";

import Box from "@material-ui/core/Box";

function Products({ getProducts, products }) {
	const { url } = useRouteMatch();

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<>
			<button onClick={() => console.log(products)}>show state</button>
			<Box p={2}>
				<Link className="noTextDecoration" to={`${url}new`}>
					<Button variant="contained" color="secondary" startIcon={<AddIcon />}>
						add new product
					</Button>
				</Link>

				<ProductsList products={products} />
			</Box>
		</>
	);
}

function mapStateToProps({ products }) {
	return {
		products: products.list,
	};
}

const mapDispatchToProps = {
	getProducts: getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
