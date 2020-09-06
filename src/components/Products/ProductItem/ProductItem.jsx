import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import { Button, Typography } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Divider from "@material-ui/core/Divider";
import { delProduct } from "../../../store/actions/products";

function ProductItem({ item }) {
	const { url } = useRouteMatch();
	const dispatch = useDispatch();

	const nowDate = new Date();

	const itemDate = new Date(item.discountDate);

	const day = 1000 * 60 * 60 * 24;

	const discountDateCounter = Math.floor((itemDate - nowDate) / day);

	console.log(item);

	return (
		<Paper key={item.id} elevation={2}>
			<Box position="relative">
				<Box p={2}>
					<Typography variant="h5">{item.title}</Typography>
					<img src={item.url} />
					<Typography variant="subtitle1">{item.description ? item.description : "-"}</Typography>
					<Typography>
						{item.discount && itemDate - nowDate < 0 ? (
							<>
								<span
									style={{
										textDecoration: "line-through",
										paddingRight: 5,
									}}
								>
									{item.price}$
								</span>

								<span>{` ${
									item.discount && item.price
										? Number(item.price) - (Number(item.price) / 100) * item.discount
										: item.price
								}$
									 - sale ${item.discount}%`}</span>
							</>
						) : (
							<span>{item.price}$</span>
						)}
					</Typography>
					<Typography>
						{item.discount && itemDate - nowDate < 0
							? `only ${discountDateCounter} days left`
							: "full price"}
					</Typography>
				</Box>
				<Divider />
				<Box p={2} display="flex" justifyContent="space-between">
					<Link className="noTextDecoration" to={`${url}${item.id}`}>
						<Button startIcon={<EditIcon />}>edit</Button>
					</Link>

					<Button onClick={() => dispatch(delProduct(item.id))} startIcon={<DeleteForeverIcon />}>
						delete
					</Button>
				</Box>
			</Box>
		</Paper>
	);
}

export default ProductItem;
