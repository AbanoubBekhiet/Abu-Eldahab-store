"use client";
import Image from "next/image";
import logo from "@/public/logo.jpeg";
import Link from "next/link";
import { CircleUserRound, Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";
function Header() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<header className="bg-[var(--color-two)] p-8  flex items-center justify-between ">
			<div className="flex items-center justify-between gap-3">
				<Image
					src={logo}
					alt="ابو الدهب للتجارة"
					width="40"
					height="40"
					className="rounded-full"
				/>
				<Menu
					className="sm:hidden cursor-pointer"
					onClick={() => setIsOpen(!isOpen)}
				/>
			</div>
			<ul
				className={`flex gap-4 font-bold text-xl transition-all duration-150 overflow-hidden
    flex-col sm:flex-row
    ${isOpen ? "max-h-96 fixed sm:static  top-24 z-30 bg-[var(--color-two)] w-full left-0 px-6 py-3" : "max-h-0 sm:max-h-full"}
    [&>li>a]:text-[var(--color-one)] [&>li>a]:transition-all [&>li>a]:duration-300 [&>li>a:hover]:text-[var(--color-three)] [&>li>a:hover]:translate-y-1 [&>li>a]:transform
  `}
			>
				<li>
					<Link href="/products">المنتجات</Link>
				</li>
				<li>
					<Link href="/categories">الفئات</Link>
				</li>
				<li>
					<Link href="/offers">العروض</Link>
				</li>
			</ul>
			<div className="flex gap-4 ">
				<Link href="profile">
					<CircleUserRound className="text-[var(--color-one)] hover:text-[var(--color-four)] transition duration-700 ease-in-out" />
				</Link>
				<Link href="cart">
					<ShoppingCart className="text-[var(--color-one)] hover:text-[var(--color-four)] transition duration-700 ease-in-out" />
				</Link>
			</div>
		</header>
	);
}

export default Header;
