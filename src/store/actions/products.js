import app from '../../firebase'

export const ACTION_GET_PRODUCTS = "ACTION_GET_PRODUCTS";
export function setProducts(data) {
	return {
		type: ACTION_GET_PRODUCTS,
		payload: data,
	};
}

export const ACTION_GET_PRODUCT = "ACTION_GET_PRODUCT";
export function setProduct(product) {
	return {
		type: ACTION_GET_PRODUCT,
		payload: product,
	};
}

export const ACTION_CREATE_PRODUCT = "ACTION_CREATE_PRODUCT";
export function createProduct(product) {
	return {
		type: ACTION_CREATE_PRODUCT,
		payload: product,
	};
}

export const ACTION_UPDATE_PRODUCT = "ACTION_UPDATE_PRODUCT";
export function updateProduct(product) {
	return {
		type: ACTION_UPDATE_PRODUCT,
		payload: product,
	};
}

export const ACTION_LOADER_PRODUCTS = "ACTION_LOADER_PRODUCTS";
export function loaderProducts(value) {
	return {
		type: ACTION_LOADER_PRODUCTS,
		payload: value,
	};
}

export const ACTION_DELETE_PRODUCT = "ACTION_DELETE_PRODUCT";
export function deleteProduct(id) {
	return {
		type: ACTION_DELETE_PRODUCT,
		payload: id,
	};
}

export const THUNK_GET_PRODUCTS = "THUNK_GET_PRODUCTS";
export function getProducts() {
	return function (dispatch) {
		dispatch(loaderProducts(true));
		app.firestore()
			.collection("products")
			.get()
			.then((querySnapshot) => {
				const tempDoc = querySnapshot.docs.map((doc) => {
					return { id: doc.id, ...doc.data() };
				});
				dispatch(setProducts(tempDoc));
			});
		dispatch(loaderProducts(false));
	};
}

// export const THUNK_DELETE_PRODUCT = "THUNK_DELETE_PRODUCT";
// export function delUser(id) {
// 	return function (dispatch) {
// 		// apiUsers.delete(id).then((resp) => {
// 		// 	dispatch(deleteUser(resp.data.id));
// 		// });
// 	};
// }

// export const THUNK_SAVE_PRODUCT = "THUNK_SAVE_PRODUCT";
// export function saveUser(item) {
// 	console.log(item);
// 	return function (dispatch, getState) {
// 		if (item.id) {
// 			dispatch(loaderUsers(true));
// 			updtUser(item).then((resp) => {
// 				dispatch(updateUser(resp.data));
// 				const userData = getState().auth.userData;
// 				if (resp.data.id == userData.data.id) {
// 					dispatch(updateUserDataLocal(resp.data));
// 				}
// 				dispatch(loaderUsers(false));
// 			});
// 		} else {
// 			dispatch(loaderUsers(true));
// 			crtUser(item).then((resp) => {
// 				dispatch(createUser(resp.data));
// 				dispatch(loaderUsers(false));
// 			});
// 		}
// 	};
// }



// export const THUNK_GET_PRODUCT = "THUNK_GET_PRODUCT";
// export function getThisUser(id) {
// 	return function (dispatch) {
// 		dispatch(loaderUsers(true));
// 		getUser(id).then((resp) => {
// 			dispatch(setUser(resp.data));
// 			dispatch(loaderUsers(false));
// 		});
// 	};
// }
