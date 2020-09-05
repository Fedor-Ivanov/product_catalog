// import React, { useState } from "react";
// import { connect } from "react-redux";
// import { Formik, Form } from "formik";
// import TextField from "@material-ui/core/TextField";
// import { saveProduct } from "../../../store/actions/products";
// import { Button } from "@material-ui/core";
// import { useHistory } from "react-router-dom";
// import Box from "@material-ui/core/Box";
// import app from "../../../firebase";
// import * as Yup from "yup";

// function ProductForm({ item, saveProduct }) {
// 	const history = useHistory();

// 	const nowDate = new Date();

// 	const [image, setImage] = useState(null);
// 	const [url, setUrl] = useState(null);

// 	const validation = Yup.object().shape({
// 		title: Yup.string()
// 			.min(20, "Too Short!")
// 			.max(60, "Too Long!")
// 			.required("Required"),
// 		description: Yup.string().max(200, "Too Long!"),
// 		price: Yup.number()
// 			.positive("must be +!")
// 			.max(99999999.99, "Too Big!")
// 			.required("Required"),
// 		discount: Yup.number()
// 			.positive("must be +!")
// 			.min(10, "more")
// 			.max(90, "less"),
// 		discountDate: Yup.date().when("discount", {
// 			is: (discount) => discount >= 10 || discount <= 90 == true,
// 			then: (fieldSchema) =>
// 				fieldSchema.min(nowDate, "feature date").required("Required"),
// 		}),
// 		file: Yup.string().required("Required"),
// 	});

// 	const handleUpload = () => {
// 		const uploadTask = app.storage().ref(`images/${image.name}`).put(image);

// 		uploadTask.on(
// 			"state_changed",
// 			(snapshot) => {},
// 			(error) => {
// 				console.log(error);
// 			},
// 			() => {
// 				app.storage()
// 					.ref("images")
// 					.child(image.name)
// 					.getDownloadURL()
// 					.then((url) => {
// 						setUrl(url);
// 					});
// 			}
// 		);
// 	};

// 	return (
// 		<>
// 			<Box p={2}>
// 				<Formik
// 					initialValues={item}
// 					validationSchema={validation}
// 					onSubmit={async (
// 						values,
// 						{ setSubmitting, setFieldValue }
// 					) => {
// 						setSubmitting(true);
// 						const uploadTask = app
// 							.storage()
// 							.ref(`images/${values.file.name}`)
// 							.put(values.file);

// 						uploadTask.on(
// 							"state_changed",
// 							(snapshot) => {},
// 							(error) => {
// 								console.log(error);
// 							},
// 							() => {
// 								app.storage()
// 									.ref("images")
// 									.child(values.file.name)
// 									.getDownloadURL()
// 									.then((url) => {
// 										setFieldValue("file", url);
// 									});
// 							}
// 						);

// 						try {
// 							const formatedDiscountDate = Date(
// 								values.discountDate
// 							);

// 							saveProduct({
// 								...values,
// 								file: url,
// 								discountDate: formatedDiscountDate,
// 							});
// 						} catch (error) {
// 							alert(error);
// 							setSubmitting(false);
// 						}

// 						history.push("/");
// 					}}
// 				>
// 					{(props) => {
// 						console.log(props);
// 						return (
// 							<Form>
// 								<input
// 									id="file"
// 									type="file"
// 									onChange={(event) => {
// 										setImage(event.currentTarget.files[0]);
// 									}}
// 								/>
// 								<TextField
// 									style={{ display: "none" }}
// 									value={props.values.file}
// 									onChange={props.handleChange}
// 									name="file"
// 									type="text"
// 									onBlur={props.handleBlur}
// 									error={
// 										props.errors.file && props.touched.file
// 									}
// 									helperText={
// 										props.errors.file &&
// 										props.touched.file &&
// 										props.errors.file
// 									}
// 								></TextField>
// 								<TextField
// 									value={props.values.title}
// 									onChange={props.handleChange}
// 									label="title"
// 									name="title"
// 									type="text"
// 									onBlur={props.handleBlur}
// 									error={
// 										props.errors.title &&
// 										props.touched.title
// 									}
// 									helperText={
// 										props.errors.title &&
// 										props.touched.title &&
// 										props.errors.title
// 									}
// 								></TextField>
// 								<TextField
// 									value={props.values.description}
// 									onChange={props.handleChange}
// 									label="description"
// 									name="description"
// 									onBlur={props.handleBlur}
// 									error={
// 										props.errors.description &&
// 										props.touched.description
// 									}
// 									helperText={
// 										props.errors.description &&
// 										props.touched.description &&
// 										props.errors.description
// 									}
// 									type="text"
// 								></TextField>
// 								<TextField
// 									value={props.values.price}
// 									onChange={props.handleChange}
// 									label="price"
// 									name="price"
// 									onBlur={props.handleBlur}
// 									error={
// 										props.errors.price &&
// 										props.touched.price
// 									}
// 									helperText={
// 										props.errors.price &&
// 										props.touched.price &&
// 										props.errors.price
// 									}
// 									type="number"
// 								></TextField>
// 								<TextField
// 									value={props.values.discount}
// 									onChange={props.handleChange}
// 									label="discount"
// 									name="discount"
// 									onBlur={props.handleBlur}
// 									error={
// 										props.errors.discount &&
// 										props.touched.discount
// 									}
// 									helperText={
// 										props.errors.discount &&
// 										props.touched.discount &&
// 										props.errors.discount
// 									}
// 									type="number"
// 								></TextField>
// 								<TextField
// 									value={props.values.discountDate}
// 									onChange={props.handleChange}
// 									label="discountDate"
// 									name="discountDate"
// 									type="date"
// 									onBlur={props.handleBlur}
// 									error={
// 										props.errors.discountDate &&
// 										props.touched.discountDate
// 									}
// 									helperText={
// 										props.errors.discountDate &&
// 										props.touched.discountDate &&
// 										props.errors.discountDate
// 									}
// 								></TextField>
// 								<Button type="submit">save</Button>
// 							</Form>
// 						);
// 					}}
// 				</Formik>
// 			</Box>
// 		</>
// 	);
// }

// function mapStateToProps({ products }, { match }) {
// 	const newProduct = {
// 		title: "",
// 		file: "",
// 		description: "",
// 		price: "",
// 		discount: "",
// 		discountDate: "",
// 	};
// 	return {
// 		item:
// 			match.params.id !== "new"
// 				? products.list.find((item) => item.id === match.params.id)
// 				: newProduct,
// 	};
// }

// const mapDispatchToProps = {
// 	saveProduct: saveProduct,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);

import React, { useState } from "react";
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

	const [image, setImage] = useState(null);
	const [url, setUrl] = useState(null);

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
			.min(10, "more")
			.max(90, "less"),
		discountDate: Yup.date().when("discount", {
			is: (discount) => discount >= 10 || discount <= 90 == true,
			then: (fieldSchema) =>
				fieldSchema.min(nowDate, "feature date").required("Required"),
		}),
		url: Yup.string().notRequired(),
		file: Yup.object().when("url", {
			is: (url) => url == false,
			then: (fieldSchema) => fieldSchema.required("Required"),
		}),
	});

	return (
		<>
			<Box p={2}>
				<Formik
					initialValues={item}
					validationSchema={validation}
					onSubmit={async (
						values,
						{ setSubmitting, setFieldValue }
					) => {
						setSubmitting(true);

						const uploadTask = app
							.storage()
							.ref(`images/${values.file.name}`)
							.put(values.file);

						await uploadTask.on(
							"state_changed",
							(snapshot) => {},
							(error) => {
								console.log(error);
							},
							() => {
								app.storage()
									.ref("images")
									.child(values.file.name)
									.getDownloadURL()
									.then((url) => {
										setFieldValue("url", url);
									});
							}
						);
						try {
							const formatedDiscountDate = Date(
								values.discountDate
							);
							saveProduct({
								...values,
								discountDate: formatedDiscountDate,
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
								<TextField
									// value={props.values.file}
									onChange={(event) => {
										props.setFieldValue(
											"file",
											event.currentTarget.files[0]
										);
									}}
									accept="image/*"
									name="file"
									label="file"
									type="file"
									error={
										props.errors.file && props.touched.file
									}
									helperText={
										props.errors.file &&
										props.touched.file &&
										props.errors.file
									}
								></TextField>
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
								<TextField
									value={props.values.discountDate}
									onChange={props.handleChange}
									label="discountDate"
									name="discountDate"
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
		file: "",
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
