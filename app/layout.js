import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Providers from "./providers";
import { getUserData } from "./_libs/actions";
import { ToastContainer } from "react-toastify";
import AuthLoader from "./_libs/AuthLoader";
import { Analytics } from "@vercel/analytics/next";
export const metadata = {
	title: {
		template: "%s | متجر ابو الدهب",
		default: "متجر ابو الدهب",
	},
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RootLayout({ children }) {
	const user = await getUserData();
	return (
		<html lang="en">
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
				</Providers>
			</body>
		</html>
	);
}
