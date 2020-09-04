import {
	ACTION_GET_PRODUCTS,
	ACTION_GET_PRODUCT,
	ACTION_DELETE_PRODUCT,
	ACTION_UPDATE_PRODUCT,
	ACTION_LOADER_PRODUCTS,
	ACTION_CREATE_PRODUCT,
} from "../actions/products";

const initialState = {
	list: [],
	isLoading: false
};

function updateProduct(list, data) {
	return list.map((item) => (item.id === data.id ? data : item));
}

function createProduct(list, item) {
	return [...list, item];
}

export default function (state = initialState, { type, payload }) {
	switch (type) {
		case ACTION_GET_PRODUCTS:
			return {
				...state,
				list: payload,
			};

		case ACTION_GET_PRODUCT:
			return {
				...state,
				list: [...state.list, payload],
			};

		case ACTION_DELETE_PRODUCT:
			return {
				...state,
				list: state.list.filter((item) => item.id !== payload),
			};

		case ACTION_UPDATE_PRODUCT:
			return {
				...state,
				list: updateProduct(state.list, payload),
			};

		case ACTION_LOADER_PRODUCTS:
			return {
				...state,
				isLoading: payload,
			};

		case ACTION_CREATE_PRODUCT:

			console.log(payload)
			return {
				...state,
				list: createProduct(state.list, payload),
			};

		default:
			return state;
	}
}
