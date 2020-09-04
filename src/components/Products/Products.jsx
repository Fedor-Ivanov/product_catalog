import React, { useEffect } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { useRouteMatch, Link } from "react-router-dom";
import ProductsList from "./ProductsList/ProductsList";
import AddIcon from "@material-ui/icons/Add";
import { getProducts } from "../../store/actions/products";

import Box from "@material-ui/core/Box";

function Products({ getProducts, isLoading, products }) {
	const { path, url } = useRouteMatch();

	useEffect(() => {
		console.log("get");
		getProducts();
	}, []);

	console.log(products);
	return (
		<>
			<Box p={2}>
				<Link className="noTextDecoration" to={`${url}new`}>
					<Button
						variant="contained"
						color="secondary"
						startIcon={<AddIcon />}
					>
						add new product
					</Button>
				</Link>

				{isLoading ? (
					<p>isLoading</p>
				) : (
					<ProductsList products={products} />
				)}
			</Box>
		</>
	);
}

function mapStateToProps({ products }) {
	return {
		isLoading: products.isLoading,
		products: products.list,
	};
}

const mapDispatchToProps = {
	getProducts: getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
