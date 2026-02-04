"use client";
import { useDispatch, useSelector } from "react-redux";
import ProductCartCard from "@/app/_components/ProductCartdCart";
import { Button } from "@/components/ui/button";
import { BanknoteX, Van } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { deleteCartItems, makeOrder } from "../_libs/APIs";
import { toast } from "react-toastify";
import { clearCart } from "@/app/store/cartSlice";
import { redirect } from "next/navigation";
import EmptyCart from "../_components/EmptyCart";



function Cart() {
	const items = useSelector((state) => state.cart.items);
	const user_data = useSelector((state) => state.auth);
	console.log(user_data);
	const dispatch = useDispatch();
	function calculateTotalPriceOfOrder() {
		return items.reduce((sum, item) => {
			return (
				sum +
				item.price_of_piece * item.number_of_pieces +
				item.price_of_packet * item.number_of_packets
			);
		}, 0);
	}

	async function handleMakingOrder() {
		if (!user_data?.phone || !user_data?.address || !user_data?.shop_name) {
			toast.error("استكمل بيانات التوصيل اولا في حسابك");
			setTimeout(() => {
				redirect("/profile/info");
			}, 300);
			return;
		}
		if (items.length === 0) {
			toast.error("لا يوجد منتجات في السلة");
			return;
		}
		try {
			const total_price = calculateTotalPriceOfOrder();
			const orderResult = await makeOrder(total_price, items);
			await deleteCartItems();
			dispatch(clearCart());
			toast.success("تم حفظ الطلب راقب حالة الطلب في صفحة الطلبات");
			setTimeout(() => {
				redirect("/profile/orders");
			}, 300);
		} catch (error) {
			console.error("Order failed:", error);
			toast.error("حدث خطأ أثناء حفظ الطلب. يرجى المحاولة مرة أخرى.");
		}
	}
	if (items.length === 0) return <EmptyCart />;
	return (
		<div className="flex flex-col lg:grid lg:grid-cols-4  w-full mx-4 p-5 lg:gap-6 ">
			<section className="col-start-1 col-end-4  flex gap-2 flex-wrap justify-center">
				{items.map((item) => (
					<ProductCartCard product={item} key={item.product_id} />
				))}
			</section>
			<section className="mt-5 w-full p-5 lg:col-start-4 lg:col-end-5 shadow-xl rounded-2xl bg-white text-[var(--color-one)]">
				<h3 className="text-3xl font-bold ">ملخص الطلب</h3>
				<Separator className="my-5 " />

				<ul className="text-2xl">
					<li>
						{" "}
						إجمالي سعر المنتجات :
						<span className="font-extrabold">
							{calculateTotalPriceOfOrder()}
						</span>
					</li>
					<li className="flex items-center gap-4">
						<span>التوصيل مجاني</span> <BanknoteX />
					</li>
				</ul>
				<Separator className="my-5 " />

				<div className="flex flex-col">
					<p className="my-8 text-xl text-center">
						يصلك الطلب في خلال يوم او اثتنين بحد اقصي بعد تأكيد الطلب
					</p>

					<Button variant="outline" size="lg" onClick={handleMakingOrder}>
						<Van /> إتمام الطلب
					</Button>
				</div>
			</section>
		</div>
	);
}

export default Cart;
