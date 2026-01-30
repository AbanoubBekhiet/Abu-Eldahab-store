"use client";
import { useSelector } from "react-redux";
import ProductCartCard from "../_components/ProductCartdCart";
function Cart() {
	const items = useSelector((state) => state.cart.items);
	function calculateTotalPriceOfOrder() {
		return items.reduce((sum, item) => {
			return (
				sum +
				item.price_of_piece * item.number_of_pieces +
				item.price_of_packet * item.number_of_packets
			);
		}, 0);
	}
	return (
		<div className="flex flex-col lg:grid lg:grid-cols-4  w-full mx-4 p-5 lg:gap-6 ">
			<section className="col-start-1 col-end-4  flex gap-2 flex-wrap justify-center">
				{items.map((item) => (
					<ProductCartCard product={item} key={item.product_id} />
				))}
			</section>
			<section className="mt-5 w-full p-5 lg:col-start-4 lg:col-end-5 shadow-xl rounded-2xl bg-white text-[var(--color-one)]">
				<h3 className="text-3xl font-bold ">الطلب</h3>
				<hr className="my-8" />
				<p className="text-2xl">
					إجمالي سعر المنتجات :
					<span className="font-extrabold">{calculateTotalPriceOfOrder()}</span>
				</p>
				<hr className="my-8" />

				<p className="my-8 text-xl text-center">
					يصل الطلب في خلال يوم او اثتنين بحد اقصي بعد تأكيد الطلب
				</p>

				<button>أتمام الطلب</button>
			</section>
		</div>
	);
}

export default Cart;
