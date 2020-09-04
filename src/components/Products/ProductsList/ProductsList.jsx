import React from "react";
import ProductItem from "../ProductItem/ProductItem";

function ProductsList({ products }) {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				gridGap: 20,
				padding: "20px 0",
			}}
		>
			{products.map((product) => {
				if (product.id) {
					return <ProductItem key={product.id} item={product} />;
				} else {
					return;
				}
			})}
		</div>
	);
}

export default ProductsList;
