import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import TextField from "@material-ui/core/TextField";
import { saveProduct } from "../../../store/actions/products";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import app from "../../../firebase";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import * as Yup from "yup";

function ProductForm({ item, saveProduct }) {
	const history = useHistory();
	const nowDate = new Date();
	const [product, setProduct] = useState(item);
	const [fileErrors, setfileErrors] = useState(null);

	useEffect(() => {
		if (item.id) {
			console.log(item.discountDate);
			const formatedDate = item.discountDate.toDate();

			console.log(formatedDate);
			setProduct({
				...product,
				discountDate: formatedDate,
			});
		}
	}, []);

	console.log(product.discountDate);

	const validation = Yup.object().shape({
		title: Yup.string().min(20, "Too short").max(60, "Too long").required("Required"),
		description: Yup.string().max(200, "Too long"),
		price: Yup.number().positive("Must be a positive number").max(99999999.99, "Too big").required("Required"),
		discount: Yup.number().positive("Must be a positive number!").min(10, "More").max(90, "Less"),
		discountDate: Yup.date().when("discount", {
			is: (discount) => discount >= 10 || discount <= 90 == true,
			then: (fieldSchema) => fieldSchema.min(nowDate, "Must be an upcoming date").required("Required"),
		}),
		url: Yup.string().required("Required"),
	});

	function onChange({ target }) {
		setProduct({
			...product,
			[target.name]: target.value,
		});
	}

	const handleDateChange = (date) => {
		setProduct({
			...product,
			discountDate: date,
		});
	};

	function onFileChange(file) {
		let img = new Image();
		img.src = window.URL.createObjectURL(file);
		img.onload = () => {
			if (img.width >= 200 && img.width <= 4000 && img.height >= 200 && img.height <= 4000) {
				const uploadTask = app.storage().ref(`images/${file.name}`).put(file);
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
			<button onClick={() => console.log(product)}>show state</button>
			<Box p={2}>
				<Formik
					enableReinitialize={true}
					initialValues={product}
					validationSchema={validation}
					onSubmit={async (values, { setSubmitting }) => {
						setSubmitting(true);

						try {
							// let formateddiscountDate = Date(values.discountDate);
							// saveProduct({
							// 	...values,
							// 	discountDate: formateddiscountDate,
							// });

							await saveProduct(values);
							history.push("/");
						} catch (error) {
							alert(error);
							setSubmitting(false);
						}
					}}
				>
					{(props) => {
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
											onFileChange(event.currentTarget.files[0]);
										}}
										accept="image/*"
										id="file"
										name="file"
										label="photo"
										type="file"
										error={props.errors.url && props.touched.url}
										helperText={
											props.errors.url && props.touched.url && props.errors.url && fileErrors
										}
									></TextField>

									<TextField
										value={props.values.title}
										onChange={onChange}
										label="title"
										name="title"
										type="text"
										onBlur={props.handleBlur}
										error={props.errors.title && props.touched.title}
										helperText={props.errors.title && props.touched.title && props.errors.title}
									></TextField>
									<TextField
										value={props.values.description}
										onChange={onChange}
										label="description"
										name="description"
										onBlur={props.handleBlur}
										error={props.errors.description && props.touched.description}
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
										error={props.errors.price && props.touched.price}
										helperText={props.errors.price && props.touched.price && props.errors.price}
										type="number"
									></TextField>
									<TextField
										value={props.values.discount}
										onChange={onChange}
										label="discount"
										name="discount"
										onBlur={props.handleBlur}
										error={props.errors.discount && props.touched.discount}
										helperText={
											props.errors.discount && props.touched.discount && props.errors.discount
										}
										type="number"
									></TextField>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											format="dd.MM.yyyy"
											type="text"
											value={props.values.discountDate ? props.values.discountDate : null}
											name="discountDate"
											label="discount date"
											onBlur={props.handleBlur}
											error={props.errors.discountDate && props.touched.discountDate}
											helperText={
												props.errors.discountDate &&
												props.touched.discountDate &&
												props.errors.discountDate
											}
											onChange={handleDateChange}
										/>
									</MuiPickersUtilsProvider>
								</Box>
								<Button variant="contained" color="secondary" type="submit">
									save
								</Button>
								<Button color="secondary" onClick={() => history.push("/")}>
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
		discountDate: null,
	};
	return {
		item: match.params.id !== "new" ? products.list.find((item) => item.id === match.params.id) : newProduct,
	};
}

const mapDispatchToProps = {
	saveProduct: saveProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
