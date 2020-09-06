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
	const [product, setProduct] = useState(item);

	const validation = Yup.object().shape({
		title: Yup.string().min(20, "Too Short!").max(60, "Too Long!").required("Required"),
		description: Yup.string().max(200, "Too Long!"),
		price: Yup.number().positive("must be +!").max(99999999.99, "Too Big!").required("Required"),
		discount: Yup.number().positive("must be +!").min(10, "more").max(90, "less"),
		discountDate: Yup.date().when("discount", {
			is: (discount) => discount >= 10 || discount <= 90 == true,
			then: (fieldSchema) => fieldSchema.min(nowDate, "feature date").required("Required"),
		}),
		// url: Yup.string().required("Required"),
		// file: Yup.object().when("url", {
		// 	is: (url) => url == false,
		// 	then: (fieldSchema) => fieldSchema.required("Required"),
		// }),

		file: Yup.mixed().nullable().test("file-size", "Invalid file size", checkIfFilesAreTooBig),
		url: Yup.string().when("file", {
			is: (checkIfFilesAreTooBig) => console.log(checkIfFilesAreTooBig),
			then: (fieldSchema) => fieldSchema.required("Required"),
		}),
	});

	function onChange({ target }) {
		setProduct({
			...product,
			[target.name]: target.value,
		});
	}

	function checkIfFilesAreTooBig(files) {
		let valid = true;
		if (files) {
			files.map((file) => {
				let img = new Image();
				img.src = window.URL.createObjectURL(file);
				img.onload = () => {
					// alert(img.width + " " + img.height);

					if (img.width >= 200 && img.width <= 1000 && img.height >= 200 && img.height <= 1000) {
						valid = true;
					} else {
						valid = false;
					}
				};
			});

			return valid;
		}
	}

	function onFileChange(file) {
		let img = new Image();
		img.src = window.URL.createObjectURL(file);
		img.onload = () => {
			// alert(img.width + " " + img.height);

			if (img.width >= 200 && img.width <= 1000 && img.height >= 200 && img.height <= 1000) {
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
								console.log(url);
								setProduct({
									...product,
									url: url,
								});
							});
					}
				);
			} else {
				alert("fail");
			}
		};

		// img.onload = function () {
		// 	alert(objectUrl.width + " " + objectUrl.height);
		// 	window.URL.revokeObjectURL(objectUrl);
		// };
	}

	return (
		<>
			<button onClick={() => console.log(product)}>product</button>
			<Box p={2}>
				<Formik
					enableReinitialize={true}
					initialValues={product}
					validationSchema={validation}
					onSubmit={async (values, { setSubmitting, setFieldValue }) => {
						setSubmitting(true);

						try {
							const formatedDiscountDate = Date(values.discountDate);
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
										onFileChange(event.currentTarget.files[0]);
									}}
									accept="image/*"
									name="file"
									label="photo"
									type="file"
									error={props.errors.url && props.touched.url}
									helperText={props.errors.url && props.touched.url && props.errors.url}
								></TextField>
								{/* <TextField
									value={props.values.url}
									onChange={onChange}
									label="url"
									name="url"
									type="text"
									onBlur={props.handleBlur}
									error={props.errors.url && props.touched.url}
									helperText={props.errors.url && props.touched.url && props.errors.url}
								></TextField> */}
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
								<TextField
									value={props.values.discountDate}
									onChange={onChange}
									label="discountDate"
									name="discountDate"
									type="date"
									onBlur={props.handleBlur}
									error={props.errors.discountDate && props.touched.discountDate}
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
		url: "",
		description: "",
		price: "",
		discount: "",
		discountDate: "",
	};
	return {
		item: match.params.id !== "new" ? products.list.find((item) => item.id === match.params.id) : newProduct,
	};
}

const mapDispatchToProps = {
	saveProduct: saveProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
