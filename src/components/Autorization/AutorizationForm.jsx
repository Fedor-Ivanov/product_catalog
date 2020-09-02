import React, { useState } from "react";
import { Formik, Form } from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function AutorizationForm() {
	const [formErrors, setFormErrors] = useState(false);

	return (
		<div>
			<Formik
				initialValues={{ login: "", password: "" }}
				validate={(values) => {
					const errors = {};
					if (!values.login) {
						errors.login = "requiredField";
					}
					if (!values.password) {
						errors.password = "requiredField";
					}
					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
					// authorize(values)
					// 	.then((response) => {
					// 		setUserTokenLocal(response).then(() => {
					// 			getAuthUser()
					// 				.then((data) => setUserDataLocal(data))
					// 				.then(() => {
					// 					setLoggedUserLocal();
					// 				});
					// 		});
					// 	})
					// 	.catch((error) => {
					// 		setFormErrors(error.message);

					// 	});
					setSubmitting(false);
				}}
			>
				{(props) => (
					<Form style={{ maxWidth: "40%", margin: "auto" }}>
						<TextField
							margin="normal"
							fullWidth
							label="login"
							name="login"
							type="text"
							error={props.errors.login && props.touched.login}
							onChange={props.handleChange}
							onBlur={props.handleBlur}
							value={props.values.login}
							helperText={props.errors.login && props.touched.login && props.errors.login}
						/>
						<TextField
							margin="normal"
							fullWidth
							label="password"
							name="password"
							type="password"
							error={props.errors.password && props.touched.password}
							onChange={props.handleChange}
							onBlur={props.handleBlur}
							value={props.values.password}
							helperText={props.errors.password && props.touched.password && props.errors.password}
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

export default AutorizationForm;
