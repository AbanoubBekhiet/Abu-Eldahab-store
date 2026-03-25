"use server";

import { createSupabaseServerClient } from "./server-client";

export async function getUserData() {
	const supabaseServer = await createSupabaseServerClient();

	const {
		data: { user },
	} = await supabaseServer.auth.getUser();

	return user;
}

export async function getOrders() {
	const user = await getUserData();

	if (!user) {
		console.error("No user session found in getOrders");
		return [];
	}

	const supabaseServer = await createSupabaseServerClient();

	let { data: orders, error } = await supabaseServer
		.from("orders")
		.select(
			`
            id,
            status,
            total_price,
            created_at,
            customer_product (
              product_id,
              number_of_packets,
              number_of_pieces,
              piece_price,
              packet_price,
                products(
                    name,
                    image_url,
                    number_of_pieces_in_packet
                )
            )
        `,
		)
		.eq("customer_id", user.id)
		.order("created_at", { ascending: false })
		.limit(20);

	if (error) throw new Error(error.message);
	return orders;
}

