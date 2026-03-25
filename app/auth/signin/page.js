"use client";
import { supabase } from "@/app/_libs/browser-client";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
function Signin() {
	const signIn = async () => {
		await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
			},
		});
	};
	return (
		<div className="my-10 p-14 flex flex-col items-center border border-[var(--color-one)] rounded-2xl  bg-[var(--color-three)]">
			<h1 className="text-2xl mb-5">اهلا بك في متجر أبو الدهب</h1>
			<p className="text-1.5xl mb-20">تسجيل الدخول أو إنشاء حساب</p>
			<Button
				onClick={signIn}
				variant="outline"
				size="lg"
				className="text-[var(--color-one)] text-1xl font-bold"
			>
				<FaGoogle />
				المتابعة بأستخدام google
			</Button>
		</div>
	);
}

export default Signin;
