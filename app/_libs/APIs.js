import { createSupabaseServerClient } from "./server-client";
import { supabase } from "./supabase";

const supabaseServer = await createSupabaseServerClient();

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

export async function getUserData() {
	const {
		data: { user },
	} = await supabaseServer.auth.getUser();
	return user;
}


