import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import { Button, Typography } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Divider from "@material-ui/core/Divider";

function ProductItem({ item }) {
	const { url } = useRouteMatch();

	console.log(item.discountDate);
	return (
		<Paper key={item.id} elevation={2}>
			<Box position="relative">
				<Box p={2}>
					{item.discount && (
						<div
							style={{
								position: "absolute",
								top: "0",
								right: "0",
								padding: 10,
								borderRadius: 5,
								backgroundColor: "red",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							{`sale - ${item.discount}%`}
						</div>
					)}
					<Typography variant="h5">{item.title}</Typography>
					<Typography variant="subtitle1">
						{item.description}
					</Typography>
					<Typography>
						{item.discount && item.price
							? Number(item.price) -
							  (Number(item.price) / 100) * item.discount
							: item.price}
					</Typography>
					{/* <Typography>{item.discountDate}</Typography> */}
				</Box>
				<Divider />
				<Box p={2} display="flex" justifyContent="space-between">
					<Link className="noTextDecoration" to={`${url}${item.id}`}>
						<Button startIcon={<EditIcon />}>edit</Button>
					</Link>

					<Button startIcon={<DeleteForeverIcon />}>delete</Button>
				</Box>
			</Box>
		</Paper>
	);
}

export default ProductItem;
