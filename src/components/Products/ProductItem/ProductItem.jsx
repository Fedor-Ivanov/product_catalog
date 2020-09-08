import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import { Button, Typography } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { delProduct } from "../../../store/actions/products";

function ProductItem({ item }) {
	const { url } = useRouteMatch();
	const dispatch = useDispatch();
	let nowDate = new Date();

	return (
		<Paper key={item.id} elevation={2} style={{ display: "grid", gridTemplateRows: "1fr 0.3fr 0.1fr" }}>
			<Box p={2}>
				<img style={{ width: "100%" }} src={item.url} />
			</Box>

			<Box p={2}>
				<Typography variant="h5">{item.title}</Typography>

				<Typography variant="subtitle1">{item.description ? item.description : "-"}</Typography>
				<Typography>
					{item.discount && item.discountDate - nowDate < 0 ? (
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
					{item.discount && item.discountDate - nowDate < 0
						? `only ${item.discountCounter} day('s) left`
						: "full price"}
				</Typography>
			</Box>

			<Box p={2} display="flex" justifyContent="space-between">
				<Link className="noTextDecoration" to={`${url}${item.id}`}>
					<Button startIcon={<EditIcon />}>edit</Button>
				</Link>

				<Button onClick={() => dispatch(delProduct(item.id))} startIcon={<DeleteForeverIcon />}>
					delete
				</Button>
			</Box>
		</Paper>
	);
}

export default ProductItem;
