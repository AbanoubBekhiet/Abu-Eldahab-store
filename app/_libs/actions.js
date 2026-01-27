"use server"

import { supabase } from "./supabase";

export async function signInWithGoogle() {
	let { data, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
	});
    
}
