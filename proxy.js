import { createServerClient } from "@supabase/ssr";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function proxy(request) {
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll: () => request.cookies.getAll(),
				setAll: (cookies) => {
					cookies.forEach(({ name, value, options }) => {
						response.cookies.set(name, value, options);
					});
				},
			},
		},
	);

	const user = await supabase.auth.getUser();
	if (!user) redirect("/auth/singin");
	else return response;
}

export const config = {
	matcher: ["/cart", "/profile"],
};
