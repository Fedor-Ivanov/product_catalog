import React, { useEffect } from "react";
import app from "../../firebase";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { getProducts } from "../../store/actions/products";

function Products({ products, isLoading, getProducts }) {
	useEffect(() => {
		getProducts();
	}, []);

	console.log(products);

	return (
		<div>
			<Button onClick={() => app.auth().signOut()}>sign out</Button>
			<p>Products</p>
			{isLoading ? (
				<p>wait please</p>
			) : (
				products.map((product) => (
					<div key={product.id}>{product.name}</div>
				))
			)}
		</div>
	);
}

function mapStateToProps({ products }) {
	return {
		products: products.list,
		isLoading: products.isLoading,
	};
}

const mapDispatchToProps = {
	getProducts: getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
