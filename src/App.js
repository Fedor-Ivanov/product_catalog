import React from "react";
import './App.css'
import AutorizationFormLogin from "./components/Autorization/AutorizationFormLogin";
import Products from "./components/Products/Products";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './components/Autorization/Auth'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import ProductForm from './components/Products/ProductForm/ProductForm'
import app from "./firebase";
import { AppBar, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Toolbar from "@material-ui/core/Toolbar";

function App() {

	return (
		<div>
			<AppBar position="static">
				<Toolbar
					style={{ display: "flex", justifyContent: "space-between" }}
				>
					<Typography>Products catalog</Typography>
					<IconButton onClick={() => app.auth().signOut()}>
						<ExitToAppIcon style={{ color: "#fff" }} />
					</IconButton>
				</Toolbar>
			</AppBar>

			<AuthProvider>
				<Router>
					<div>
						<Switch>
							<PrivateRoute exact path='/' component={Products} />
							<Route exact path='/login' component={AutorizationFormLogin} />
							<PrivateRoute
								path={`/:id`}
								component={ProductForm}
							/>
						</Switch>
					</div>
				</Router>
			</AuthProvider>
		</div>
	)
}

export default App
