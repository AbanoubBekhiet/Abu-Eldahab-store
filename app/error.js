"use client";

import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
export const metadata = {
	title: "خطأ في الصفحة",
};
export default function Error({ error }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex flex-col items-center justify-center">
			<ShieldAlert className="text-red-500 w-16 h-16 mb-4" />
			<h2 className="text-2xl font-bold  mb-2 text-[var(--color-one)]">
				{" "}
				Something went wrong!
			</h2>
			<Link
				href="/"
				className="bg-[var(--color-one)] hover:bg-[var(--color-two)] text-white font-bold py-2 px-4 rounded"
			>
				<button>الصفحة الرئيسية</button>
			</Link>
		</div>
	);
}
