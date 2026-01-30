"use server";

import { createSupabaseServerClient } from "./server-client";
const supabaseServer = await createSupabaseServerClient();

export async function getUserData() {
	const {
		data: { user },
	} = await supabaseServer.auth.getUser();
	return user;
}
