"use client";
import Image from "next/image";
import logo from "@/public/logo.jpeg";
import Link from "next/link";
import {
	CircleUserRound,
	House,
	LogIn,
	LogOut,
	Menu,
	PackageSearch,
	ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../_libs/browser-client";
import { useRouter } from "next/navigation";
import { useSupabaseUser } from "../hooks/useSupabaseUser";
import { useDispatch } from "react-redux";
import { getCart } from "../_libs/APIs";
import { setCart } from "../store/cartSlice";
import { logout } from "../store/authSlice";
import { toast } from "react-toastify";

function Header({ initialUser }) {
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
		dispatch(logout());
		toast.success("تم تسجيل الخروج بنجاح");
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
			</div>
			<ul className="flex gap-4  ">
				<li>
					<Link href="/products?page=1" title="جميع المنتجات">
						<PackageSearch className="text-[var(--color-one)] hover:text-[var(--color-four)] transition duration-700 ease-in-out" />
					</Link>
				</li>
				<li>
					<Link href="/" title="الصفحة الرئيسية">
						<House className="text-[var(--color-one)] hover:text-[var(--color-four)] transition duration-700 ease-in-out" />
					</Link>
				</li>
				{/* <li>
					<Link href="/offers">العروض</Link>
				</li> */}
			</ul>
			<div className="flex gap-4 ">
				<Link href="/profile/info" title="الملف الشخصي">
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
