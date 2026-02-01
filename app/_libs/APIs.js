import { supabase } from "./supabase";
import { supabase as clientBrowser } from "./browser-client";

async function getAuthUserId() {
	const {
		data: { user },
		error: userError,
	} = await clientBrowser.auth.getUser();
	if (userError) throw new Error(userError.message);
	return user.id;
}

export async function getProducts() {
	try {
		let { data: products, error } = await supabase.from("products").select("*");

		return products;
	} catch (error) {
		throw new Error();
	}
}

export async function getCategories() {
	try {
		let { data: categories } = await supabase.from("categories").select("*");
		return categories;
	} catch (error) {
		throw new Error("there is a problem in fetching categories");
	}
}

export async function getCart(user_id) {
	try {
		const { data: cart, error } = await supabase
			.from("cart")
			.select(
				`
				user_id,
				number_of_packets,
				number_of_pieces,
				price_of_packet,
				price_of_piece,
				product_id,
				products (
					name,
					image_url,
					number_of_pieces_in_packet
				)
			`,
			)
			.eq("user_id", user_id);

		if (error) throw error;

		return cart.map(({ products, ...item }) => ({
			...item,
			...products,
		}));
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function insertCartProduct(user_id, product) {
	const { data, error } = await supabase.from("cart").insert([
		{
			user_id: user_id,
			product_id: product.id,
			number_of_packets: 1,
			number_of_pieces: 0,
			price_of_packet: product.price_of_packet,
			price_of_piece: product.price_of_piece,
		},
	]);

	if (error) {
		console.error("Insert cart error:", error);
		throw error;
	}
	return data;
}

export async function updateCartProduct(
	product_id,
	user_id,
	number_of_packets,
	number_of_pieces,
) {
	try {
		const { data, error } = await supabase
			.from("cart")
			.update({
				number_of_packets: number_of_packets,
				number_of_pieces: number_of_pieces,
			})
			.eq("product_id", product_id)
			.eq("user_id", user_id);

		return "product updated successfully in cart";
	} catch (error) {
		throw new Error(error);
	}
}

export async function deleteCartProduct(product_id, user_id) {
	const { error } = await supabase
		.from("cart")
		.delete()
		.eq("product_id", product_id)
		.eq("user_id", user_id);
	if (error) {
		throw new Error("problem in removing element from cart", error);
	}
}

export async function getProfileData() {
	const {
		data: { user },
		error: userError,
	} = await clientBrowser.auth.getUser();
	if (userError || !user) throw new Error("Not authenticated");

	const { data: profile, error } = await clientBrowser
		.from("profiles")
		.select("*")
		.eq("id", user.id)
		.maybeSingle();

	if (error) throw new Error(error.message);
	return profile;
}

export async function updateProfileData() {
	const {
		data: { user },
		error: userError,
	} = await clientBrowser.auth.getUser();
	if (userError || !user) throw new Error("Not authenticated");

	const { data, error } = await clientBrowser
		.from("profiles")
		.update({
			full_name: user_data.full_name,
			address: user_data.address,
			phone: user_data.phone,
			shop_name: user_data.shop_name,
			notes: user_data.notes ?? "",
		})
		.eq("id", user.id)
		.select("id, full_name, address, phone, shop_name, notes")
		.maybeSingle();

	if (error) {
		console.error("Supabase update error:", error);
		throw error;
	}

	return data;
}

//making order process

export async function makeOrder(total_price, cartItems) {
	const user_id = await getAuthUserId();

	const { data: orderData, error: orderError } = await clientBrowser
		.from("orders")
		.insert([{ customer_id: user_id, total_price: total_price }])
		.select()
		.single();
	if (orderError) {
		throw new Error(orderError.message);
	}

	const rowsToInsert = cartItems.map((item) => ({
		order_id: orderData.id,
		customer_id: user_id,
		product_id: item.product_id,
		packet_price: item.price_of_packet,
		piece_price: item.price_of_piece,
		number_of_packets: item.number_of_packets,
		number_of_pieces: item.number_of_pieces,
	}));

	const { data, error } = await clientBrowser
		.from("customer_product")
		.insert(rowsToInsert)
		.select();

	if (error) {
		throw new Error(error.message);
	}
	return data;
}

export async function deleteCartItems() {
	const user_id = await getAuthUserId();
	const { error } = await clientBrowser
		.from("cart")
		.delete()
		.eq("user_id", user_id);
	if (error) throw new Error(error.message);
}


