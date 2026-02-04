import OrderDetails from "@/app/_components/OrderDetails";
import { OrderItems } from "@/app/_components/OrderItems";
import { getOrders } from "@/app/_libs/actions";
export const metadata = {
	title: "طلباتك",
	description: "معلومات  طلباتك السابقة",
};
async function page({ searchParams }) {
	const orders = await getOrders();
	const params = await searchParams;

	return (
		<div className="lg:grid lg:grid-cols-5 gap-4  w-full text-[var(--color-one)]">
			<section className=" col-start-1 col-end-3 p-5 rounded-xl flex flex-col items-center">
				<h3 className="text-2xl font-bold mb-5">الطلبات السابقة</h3>
				<OrderItems orders={orders} />
			</section>
			<section className=" col-start-3 col-end-6 p-5 rounded-xl bg-[var(--color-four)]">
				<h3 className="text-2xl font-bold mb-5">تفاصيل الطلب</h3>
				<OrderDetails orders={orders} params={params} />
			</section>
		</div>
	);
}

export default page;
