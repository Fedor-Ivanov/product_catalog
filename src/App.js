import React, { useEffect } from "react";
import "./App.css";
import AutorizationFormLogin from "./components/Autorization/AutorizationFormLogin";
import Products from "./components/Products/Products";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { AuthProvider } from "./components/Autorization/Auth";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ProductForm from "./components/Products/ProductForm/ProductForm";
import app from "./firebase";
import { AppBar, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Toolbar from "@material-ui/core/Toolbar";
import { getProducts } from "./store/actions/products";

function App() {
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(getProducts());
	// }, []);

	return (
		<div>
			<Router>
				<AppBar position="static">
					<Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
						<Link className="noTextDecoration" style={{ color: "#fff" }} to="/">
							<Typography>Products catalog</Typography>
						</Link>
						<IconButton onClick={() => app.auth().signOut()}>
							<ExitToAppIcon style={{ color: "#fff" }} />
						</IconButton>
					</Toolbar>
				</AppBar>

				<AuthProvider>
					<div>
						<Switch>
							<PrivateRoute exact path="/" component={Products} />
							<Route exact path="/login" component={AutorizationFormLogin} />
							<PrivateRoute path={`/:id`} component={ProductForm} />
						</Switch>
					</div>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
