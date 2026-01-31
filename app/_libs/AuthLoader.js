"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/store/authSlice";
import { supabase } from "@/app/_libs/browser-client";
import { getProfileData } from "./APIs";

export default function AuthLoader() {
	const dispatch = useDispatch();

	useEffect(() => {
		const syncUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (user) {
				const userProfile = await getProfileData(user.id);
				dispatch(setUser(userProfile));
			}
		};

		syncUser();
	}, [dispatch]);

	return null;
}
