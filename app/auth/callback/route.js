import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
export async function GET(request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");

	if (!code) {
		return NextResponse.redirect(`${origin}/login`);
	}
	const response = NextResponse.redirect(`${origin}`);

	const supabaseServer = createServerClient(
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

	await supabaseServer.auth.exchangeCodeForSession(code);

	return response;
}
