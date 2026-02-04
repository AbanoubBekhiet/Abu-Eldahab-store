import { SearchAlert } from "lucide-react";
import Link from "next/link";
export const metadata = {
	title: "الصفحة غير موجودة",
};
export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center ">
			<SearchAlert className="text-red-500 w-16 h-16 mb-4 " />
			<h2 className="text-2xl font-bold  mb-2 text-[var(--color-one)]">
				Not Found
			</h2>
			<p className="mb-4 text-[var(--color-one)]">
				Could not find requested resource
			</p>
			<Link
				href="/"
				className="bg-[var(--color-one)] hover:bg-[var(--color-two)] text-white font-bold py-2 px-4 rounded"
			>
				Return Home
			</Link>
		</div>
	);
}
