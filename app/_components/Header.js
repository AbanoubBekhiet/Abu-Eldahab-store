"use client";
import Image from "next/image";
import logo from "@/public/logo.jpeg";
import Link from "next/link";
import {
	CircleUserRound,
	LogIn,
	LogOut,
	Menu,
	ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../_libs/browser-client";
import { useRouter } from "next/navigation";
import { useSupabaseUser } from "../hooks/useSupabaseUser";
import { useDispatch } from "react-redux";
import { getCart } from "../_libs/APIs";
import { setCart } from "../store/cartSlice";

function Header({ initialUser }) {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();
	const user = useSupabaseUser(initialUser);
	useEffect(() => {
		async function fetchCart() {
			if (user) {
				const cartItems = await getCart(user.id);
				dispatch(setCart(cartItems));
			}
		}
		fetchCart();
	}, [dispatch, user?.id, user]);

	const router = useRouter();
	async function signOut() {
		let { error } = await supabase.auth.signOut();
		router.push("/products");
	}

	return (
		<header className="bg-[var(--color-two)] p-8  flex items-center justify-between ">
			<div className="flex items-center  gap-3">
				<Link href="/">
					<Image
						src={logo}
						alt="ابو الدهب للتجارة"
						width="40"
						height="40"
						className="rounded-full"
					/>
				</Link>
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
					<Link href="/">الصفحة الرئيسية</Link>
				</li>
				<li>
					<Link href="/offers">العروض</Link>
				</li>
			</ul>
			<div className="flex gap-4 ">
				<Link href="/profile" title="الملف الشخصي">
					<CircleUserRound className="text-[var(--color-one)] hover:text-[var(--color-four)] transition duration-700 ease-in-out" />
				</Link>
				<Link href="/cart" title="سلة المشتريات">
					<ShoppingCart className="text-[var(--color-one)] hover:text-[var(--color-four)] transition duration-700 ease-in-out" />
				</Link>
				{user ? (
					<button
						onClick={signOut}
						type="submit"
						className="cursur-pointer text-red-400 hover:text-red-600 transition duration-700 ease-in-out"
						title="تسجيل خروج"
					>
						<LogOut />
					</button>
				) : (
					<Link
						title="تسجيل دخول"
						href="/auth/signin"
						className="text-[var(--color-one)] hover:text-[var(--color-four)] transition duration-700 ease-in-out flex items-center justify-center"
					>
						<LogIn />
					</Link>
				)}
			</div>
		</header>
	);
}

export default Header;
