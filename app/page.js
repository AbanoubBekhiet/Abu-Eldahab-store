import HomeCategoriesList from "./_components/HomeCategoriesList";
import HomeHeader from "./_components/HomeHeader";
import HomeMarque from "./_components/HomeMarque";

function page() {
	return (
		<div className="w-4/5">
			<HomeHeader />
			{/* <HomeMarque /> */}
			<HomeCategoriesList />
		</div>
	);
}

export default page;
