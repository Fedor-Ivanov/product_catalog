import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import TextField from "@material-ui/core/TextField";
import { saveProduct } from "../../../store/actions/products";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import app from "../../../firebase";
import * as Yup from "yup";

function ProductForm({ item, saveProduct }) {
	const history = useHistory();
	const nowDate = new Date();
	const [product, setProduct] = useState(item);
	const [fileErrors, setfileErrors] = useState(null);

	useEffect(() => {
		const formatedDate = new Date(item.discountDate).toDateString();
		setProduct({
			...product,
			discountDate: formatedDate,
		});
	}, []);

	const validation = Yup.object().shape({
		title: Yup.string()
			.min(20, "Too short")
			.max(60, "Too long")
			.required("Required"),
		description: Yup.string().max(200, "Too long"),
		price: Yup.number()
			.positive("Must be a positive number")
			.max(99999999.99, "Too big")
			.required("Required"),
		discount: Yup.number()
			.positive("Must be a positive number!")
			.min(10, "More")
			.max(90, "Less"),
		discountDate: Yup.date().when("discount", {
			is: (discount) => discount >= 10 || discount <= 90 == true,
			then: (fieldSchema) =>
				fieldSchema
					.min(nowDate, "Must be an upcoming date")
					.required("Required"),
		}),
		url: Yup.string().required("Required"),
	});

	function onChange({ target }) {
		setProduct({
			...product,
			[target.name]: target.value,
		});
	}

	function onFileChange(file) {
		let img = new Image();
		img.src = window.URL.createObjectURL(file);
		img.onload = () => {
			if (
				img.width >= 200 &&
				img.width <= 4000 &&
				img.height >= 200 &&
				img.height <= 4000
			) {
				const uploadTask = app
					.storage()
					.ref(`images/${file.name}`)
					.put(file);
				uploadTask.on(
					"state_changed",
					(snapshot) => {},
					(error) => {
						console.log(error);
					},
					() => {
						app.storage()
							.ref("images")
							.child(file.name)
							.getDownloadURL()
							.then((url) => {
								setfileErrors(null);
								setProduct({
									...product,
									url: url,
								});
							});
					}
				);
			} else {
				setfileErrors("Too big");
			}
		};

		img.onerror = () => {
			return;
		};
	}

	return (
		<>
			<Box p={2}>
				<Formik
					enableReinitialize={true}
					initialValues={product}
					validationSchema={validation}
					onSubmit={async (values, { setSubmitting }) => {
						setSubmitting(true);

						try {
							const formateddiscountDate = Date(
								values.discountDate
							);
							saveProduct({
								...values,
								discountDate: formateddiscountDate,
							});
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
								<Box
									p={3}
									style={{
										display: "grid",
										gridTemplateColumns: "repeat(3, 1fr)",
										gridGap: 30,
									}}
								>
									<TextField
										onChange={(event) => {
											onFileChange(
												event.currentTarget.files[0]
											);
										}}
										accept="image/*"
										id="file"
										name="file"
										label="photo"
										type="file"
										error={
											props.errors.url &&
											props.touched.url
										}
										helperText={
											props.errors.url &&
											props.touched.url &&
											props.errors.url &&
											fileErrors
										}
									></TextField>

									<TextField
										value={props.values.title}
										onChange={onChange}
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
										onChange={onChange}
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
										onChange={onChange}
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
										onChange={onChange}
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
									<TextField
										value={props.values.discountDate}
										onChange={onChange}
										label="discount date"
										name="discountDate"
										format="yyyy-MM-dd"
										type="date"
										onBlur={props.handleBlur}
										error={
											props.errors.discountDate &&
											props.touched.discountDate
										}
										helperText={
											props.errors.discountDate &&
											props.touched.discountDate &&
											props.errors.discountDate
										}
									></TextField>
								</Box>
								<Button
									variant="contained"
									color="secondary"
									type="submit"
								>
									save
								</Button>
								<Button
									color="secondary"
									onClick={() => history.push("/")}
								>
									back
								</Button>
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
		url: "",
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
