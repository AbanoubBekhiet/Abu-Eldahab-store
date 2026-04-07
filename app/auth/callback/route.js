import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");

	const returnTo = searchParams.get("returnTo");

	if (!code) {
		return NextResponse.redirect(`${origin}/auth/signin`);
	}

	let cookiesToSet = [];

	const supabaseServer = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll: () => request.cookies.getAll(),
				setAll: (cookies) => {
					cookiesToSet = cookies;
				},
			},
		},
	);

	const {
		data: { session },
	} = await supabaseServer.auth.exchangeCodeForSession(code);

	let targetUrl = `${origin}/products`;

	if (session?.user) {
		const { data: profile } = await supabaseServer
			.from("profiles")
			.select("phone")
			.eq("id", session.user.id)
			.maybeSingle();

		if (!profile?.phone) {
			targetUrl = `${origin}/profile/info?returnTo=${encodeURIComponent(
				returnTo || "/products"
			)}`;
		} else if (returnTo) {
			targetUrl = `${origin}${returnTo}`;
		}
	} else {
		targetUrl = `${origin}/auth/signin`;
	}

	const response = NextResponse.redirect(targetUrl);

	cookiesToSet.forEach(({ name, value, options }) => {
		response.cookies.set(name, value, options);
	});

	return response;
}
