import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import app from "../../firebase";

function AutorizationFormLogin() {
	const [formErrors, setFormErrors] = useState(false);
	const history = useHistory();
	return (
		<div>
			<Formik
				initialValues={{ email: "", password: "" }}
				validate={(values) => {
					const errors = {};
					if (!values.email) {
						errors.email = "requiredField";
					}
					if (!values.password) {
						errors.password = "requiredField";
					}
					return errors;
				}}
				onSubmit={async (values, { setSubmitting }) => {
					setSubmitting(true);

					try {
						await app
							.auth()
							.signInWithEmailAndPassword(
								values.email,
								values.password
							);
						history.push("/");
					} catch (error) {
						alert(error);
						setSubmitting(false);
					}
				}}
			>
				{(props) => (
					<Form style={{ maxWidth: "40%", margin: "auto" }}>
						<TextField
							margin="normal"
							fullWidth
							label="email"
							name="email"
							type="text"
							error={props.errors.email && props.touched.email}
							onChange={props.handleChange}
							onBlur={props.handleBlur}
							value={props.values.email}
							helperText={
								props.errors.email &&
								props.touched.email &&
								props.errors.email
							}
						/>
						<TextField
							margin="normal"
							fullWidth
							label="password"
							name="password"
							type="password"
							error={
								props.errors.password && props.touched.password
							}
							onChange={props.handleChange}
							onBlur={props.handleBlur}
							value={props.values.password}
							helperText={
								props.errors.password &&
								props.touched.password &&
								props.errors.password
							}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							disabled={props.isSubmitting}
						>
							login
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default AutorizationFormLogin;
