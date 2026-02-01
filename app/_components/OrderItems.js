"use client";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function OrderItems({ orders }) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathName = usePathname();
	function handleSelectOrder(order_id) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("order_id", order_id);
		router.replace(`${pathName}?${params.toString()}`, { scroll: false });
	}

	function styledDate(created_at) {
		if (!created_at) return "تاريخ غير معروف";

		const date = new Date(created_at);
		return new Intl.DateTimeFormat("ar-EG", {
			dateStyle: "medium",
			timeStyle: "short",
		}).format(date);
	}
	const badgeColorMap = {
		"تم إلغاء الطلب": "bg-red-500 hover:bg-red-600 text-white",
		"جاري التحضير": "bg-blue-500 hover:bg-blue-600 text-white",
		"جاري التوصيل": "bg-yellow-500 hover:bg-yellow-600 text-black",
		"تم التوصيل": "bg-green-500 hover:bg-green-600 text-white",
	};
	return (
		<Table dir="rtl">
			<TableHeader>
				<TableRow className="hover:bg-[var(--color-three)]">
					<TableHead className="text-center font-bold">الوقت</TableHead>
					<TableHead className="text-center font-bold">
						إجمالي الفاتورة
					</TableHead>
					<TableHead className="text-center font-bold">حالة الطلب</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{orders.map((order) => (
					<TableRow key={order.id} onClick={() => handleSelectOrder(order.id)}>
						<TableCell className="font-medium text-center">
							{styledDate(order?.created_at)}
						</TableCell>
						<TableCell className="text-center">
							{order?.total_price} ج.م
						</TableCell>
						<TableCell className="text-center">
							<Badge
								variant="outline"
								className={`${badgeColorMap[order?.status] || "bg-gray-500 text-white"}`}
							>
								{order?.status}
							</Badge>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
