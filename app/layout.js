import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Providers from "./providers";
import { getUserData } from "./_libs/actions";
import { ToastContainer } from "react-toastify";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RootLayout({ children }) {
	const user = await getUserData();
	return (
		<html lang="en">
			<body className="flex flex-col min-h-screen">
				<Providers>
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
				</Providers>
			</body>
		</html>
	);
}
