import { ProductsFilter } from "../_components/ProductsFIlter";
import ProductsList from "../_components/ProductsList";

function page() {
	return (
		<div>
			<ProductsFilter />
			<ProductsList />
		</div>
	);
}

export default page;
