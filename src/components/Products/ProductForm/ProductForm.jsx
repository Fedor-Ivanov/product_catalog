import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import TextField from "@material-ui/core/TextField";
import { saveProduct } from "../../../store/actions/products";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import * as Yup from "yup";

function ProductForm({ item, saveProduct }) {
	const history = useHistory();

	const validation = Yup.object().shape({
		title: Yup.string()
			.min(20, "Too Short!")
			.max(60, "Too Long!")
			.required("Required"),
		description: Yup.string().max(200, "Too Long!"),
		price: Yup.number()
			.positive("must be +!")
			.max(99999999.99, "Too Big!")
			.required("Required"),
		discount: Yup.number()
			.positive("must be +!")
			.moreThan(10, "more")
			.lessThan(90, "less"),
		// discountDate: Yup.string().email("Invalid email").required("Required"),
	});

	return (
		<>
			<Box p={2}>
				<Formik
					initialValues={item}
					validationSchema={validation}
					onSubmit={async (values, { setSubmitting }) => {
						setSubmitting(true);
						try {
							saveProduct(values);
						} catch (error) {
							alert(error);
							setSubmitting(false);
						}

						history.push("/");
					}}
				>
					{(props) => {
						console.log(props);
						return (
							<Form>
								{/* <input
							type="file"
							label="photo"
							name="photo"
							value={props.values.photo}
							onChange={props.handleChange}
						/> */}
								<TextField
									value={props.values.title}
									onChange={props.handleChange}
									label="title"
									name="title"
									type="text"
									onBlur={props.handleBlur}
									error={
										props.errors.title &&
										props.touched.title
									}
									helperText={
										props.errors.title &&
										props.touched.title &&
										props.errors.title
									}
								></TextField>
								<TextField
									value={props.values.description}
									onChange={props.handleChange}
									label="description"
									name="description"
									onBlur={props.handleBlur}
									error={
										props.errors.description &&
										props.touched.description
									}
									helperText={
										props.errors.description &&
										props.touched.description &&
										props.errors.description
									}
									type="text"
								></TextField>
								<TextField
									value={props.values.price}
									onChange={props.handleChange}
									label="price"
									name="price"
									onBlur={props.handleBlur}
									error={
										props.errors.price &&
										props.touched.price
									}
									helperText={
										props.errors.price &&
										props.touched.price &&
										props.errors.price
									}
									type="number"
								></TextField>
								<TextField
									value={props.values.discount}
									onChange={props.handleChange}
									label="discount"
									name="discount"
									onBlur={props.handleBlur}
									error={
										props.errors.discount &&
										props.touched.discount
									}
									helperText={
										props.errors.discount &&
										props.touched.discount &&
										props.errors.discount
									}
									type="number"
								></TextField>
								{/* <TextField
							value={props.values.discountDate}
							onChange={props.handleChange}
							label="discountDate"
							name="discountDate"
							onBlur={props.handleBlur}
							type="date"
						></TextField> */}
								<Button type="submit">save</Button>
							</Form>
						);
					}}
				</Formik>
			</Box>
		</>
	);
}

function mapStateToProps({ products }, { match }) {
	const newProduct = {
		title: "",
		photo: "",
		description: "",
		price: "",
		discount: "",
		discountDate: "",
	};
	return {
		item:
			match.params.id !== "new"
				? products.list.find((item) => item.id === match.params.id)
				: newProduct,
	};
}

const mapDispatchToProps = {
	saveProduct: saveProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
