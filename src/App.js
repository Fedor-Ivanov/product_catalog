import React from "react";
import AutorizationFormLogin from "./components/Autorization/AutorizationFormLogin";
import Products from "./components/Products/Products";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthProvider } from './components/Autorization/Auth'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

function App() {
	return (
		<AuthProvider>
			<Router>
				<div>
					<PrivateRoute exact path='/' component={Products} />
					<Route exact path='/login' component={AutorizationFormLogin} />
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
