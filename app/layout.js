import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Header />
				<main className="p-4 flex justify-center">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
