import React, { useEffect, useState } from "react";
import app from "../../firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [pending, setPending] = useState(true);

	useEffect(() => {
		app.auth().onAuthStateChanged((user) => {
			setUser(user);
			setPending(false);
		});
	}, []);

	if (pending) {
		return <>Loading...</>;
	}

	return (
		<AuthContext.Provider
			value={{
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
