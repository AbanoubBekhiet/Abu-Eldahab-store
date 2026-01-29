import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { getUserData } from "./_libs/APIs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RootLayout({ children }) {
	const user = await getUserData();
	console.log(user);
	return (
		<html lang="en">
			<body className=" flex flex-col  min-h-screen">
				<Header initialUser={user} />
				<main className="p-4 flex justify-center flex-1">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
