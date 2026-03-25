import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Providers from "./providers";
import { getUserData } from "./_libs/actions";
import { ToastContainer } from "react-toastify";
import AuthLoader from "./_libs/AuthLoader";
import { Analytics } from "@vercel/analytics/next";
import WhatsUpContact from "./_components/whatsUpContact";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
export const metadata = {
	title: {
		template: "%s | متجر ابو الدهب",
		default: "متجر ابو الدهب",
	},
	verification: {
		google: "tQMqyEQB3Q73XwZHx9spm4bfQiUcioaOaNnsJiuzKHA",
	},
	other: {
		"google-adsense-account": "ca-pub-1695203399756090",
	},
};
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RootLayout({ children }) {
	const user = await getUserData();
	return (
		<html lang="en">
			<head>
				<Script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1695203399756090"
					crossorigin="anonymous"
					strategy="afterInteractive"
				/>
			</head>
			<body className="flex flex-col min-h-screen">
				<Providers>
					<AuthLoader />
					<Header initialUser={user} />
					<main className="p-4 flex justify-center flex-1">{children}</main>
					<Footer />
					<ToastContainer
						position="top-right"
						autoClose={3000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick={false}
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
					/>
					<Analytics />
					<SpeedInsights />
					<GoogleAnalytics gaId="G-T844GKQWR1" />
					<WhatsUpContact />
				</Providers>
			</body>
		</html>
	);
}
