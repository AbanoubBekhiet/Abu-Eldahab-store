import { getUserData } from "../_libs/actions";
import { getCategories } from "../_libs/APIs";
import HomeProductsList from "./HomeProductsList";

async function HomeCategoriesList() {
	const categories = await getCategories();
	const user = await getUserData();
	return (
		<section>
			<div className="flex flex-col text-[var(--color-one)] items-center my-10">
				<p className="text-3xl">تصفح حسب التصنيفات</p>
				<p className="text-2xl text-[var(--color-two)]">
					اكتشف منتجاتنا المميزة من خلال التصنيفات المختلفة
				</p>
			</div>
			<div>
				{categories.map((category) => (
					<HomeProductsList key={category.id} category={category} user={user} />
				))}
			</div>
		</section>
	);
}

export default HomeCategoriesList;
