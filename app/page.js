import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import HomeCategoriesList from "./_components/HomeCategoriesList";
import HomeHeader from "./_components/HomeHeader";
import HomeMarque from "./_components/HomeMarque";
import Error from "./error";
export const metadata = {
	title: "متجر ابو الدهب",
	description:
		"متجر أبو الدهب - هتلاقي احتيجات محلك كلها عند ابو الدهب من خردوات ومنظفات و مستحضرات تجميل و ورقيات ودوات مدرسية",
	keywords: [
		"منتجات",
		"مساحيق",
		"خردوات",
		"متجر",
		"ابو الدهب",
		"محل",
		"تسوق",
		"منظفات",
		"الاسكندرية",
		"ولاعات",
		"ادوات مدرسية",
		"مستلزمات منزلية",
		"مستحضرات تجميل",
		"ورقيات",
		"حفاضات",
		"مناديل",
	],
};
function page() {
	return (
		<div className="w-4/5">
			<ErrorBoundary fallback={<Error />}>
				<HomeHeader />
				{/* <HomeMarque /> */}
				<HomeCategoriesList />
			</ErrorBoundary>
		</div>
	);
}

export default page;
