import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Autorization/Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
	const { user } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(routeProps) => {
				return !!user ? (
					<RouteComponent {...routeProps} />
				) : (
					<Redirect to={"/login"} />
				);
			}}
		/>
	);
};

export default PrivateRoute;
