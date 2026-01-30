// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		setCart: (state, action) => {
			state.items = action.payload;
		},
		addToCart: (state, action) => {
			const item = state.items.find((i) => i.id === action.payload.id);
			if (!item)
				state.items.push({
					user_id: action.payload.id,
					number_of_packets: 1,
					number_of_pieces: 0,
					price_of_piece: 0,
					price_of_packet: action.payload.price_of_packet,
					product_id: action.payload.id,
					name: action.payload.name,
					image_url: action.payload.image_url,
					number_of_pieces_in_packet: action.payload.number_of_pieces_in_packet,
				});
		},
		updateItem: (state, action) => {
			const { product_id, number_of_packets, number_of_pieces } =
				action.payload;
			const item = state.items.find((i) => i.product_id === product_id);
			if (item) {
				item.number_of_packets = number_of_packets;
				item.number_of_pieces = number_of_pieces;
			}
		},
		removeFromCart: (state, action) => {
			state.items = state.items.filter((i) => i.product_id !== action.payload);
		},
	},
});

export const { setCart, addToCart, updateItem, removeFromCart } =
	cartSlice.actions;
export default cartSlice.reducer;
