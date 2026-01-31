const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
	user_id: null,
	full_name: null,
	phone: null,
	shop_name: null,
	address: null,
	notes: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user_id = action.payload.id;
			state.full_name = action.payload.full_name;
			state.phone = action.payload.phone;
			state.shop_name = action.payload.shop_name;
			state.address = action.payload.address;
			state.notes = action.payload.notes;
		},
		logout: (state) => {
			state.user_id = null;
			state.full_name = null;
			state.phone = null;
			state.shop_name = null;
			state.address = null;
			state.notes = null;
		},
	},
});

export const { setUser, getUser, logout } = authSlice.actions;
export default authSlice.reducer;
