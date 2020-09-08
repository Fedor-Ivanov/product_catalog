import app from "../../firebase";

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
		app.firestore()
			.collection("products")
			.get()
			.then((querySnapshot) => {
				const tempDoc = querySnapshot.docs.map((doc) => {
					return { id: doc.id, ...doc.data() };
				});
				dispatch(setProducts(tempDoc));
			});
	};
}

export const THUNK_SAVE_PRODUCT = "THUNK_SAVE_PRODUCT";
export function saveProduct(item) {
	return function (dispatch) {
		if (item.id) {
			app.firestore().collection("products").doc(item.id).update(item);
		} else {
			app.firestore()
				.collection("products")
				.add(item)
				.then((docRef) => {
					app.firestore()
						.collection("products")
						.doc(docRef.id)
						.get()
						.then((newItem) => {
							dispatch(createProduct(newItem.data()));
						});
				});
		}
	};
}

export const THUNK_DELETE_PRODUCT = "THUNK_DELETE_PRODUCT";
export function delProduct(id) {
	return function (dispatch) {
		app.firestore()
			.collection("products")
			.doc(id)
			.delete()
			.then(() => {
				dispatch(deleteProduct(id));
			});
	};
}
