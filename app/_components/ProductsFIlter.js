"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export function ProductsFilter({ categories }) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathName = usePathname();

	function handleFilter(filter) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("filter", filter);
		params.set("search", "لا يوجد");
		params.set("page", "1");
		router.replace(`${pathName}?${params.toString()}`, { scroll: false });
	}

	return (
		<div className="flex md:items-center mb-5 md:justify-around flex-col md:flex-row ">
			<div>
				<form>
					<Field orientation="horizontal">
						<Input type="search" placeholder="بحث ......" name="search" />
						<Button>بحث</Button>
					</Field>
				</form>
			</div>
			<Tabs defaultValue="overview" className="p-5">
				<TabsList className="flex flex-wrap">
					{categories.map((category) => (
						<TabsTrigger
							value={category.name}
							key={category.id}
							onClick={() => handleFilter(category.name)}
						>
							{category.name}
						</TabsTrigger>
					))}
					<TabsTrigger
						value="كل المنتجات"
						onClick={() => handleFilter("كل المنتجات")}
					>
						كل المنتجات
					</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	);
}
