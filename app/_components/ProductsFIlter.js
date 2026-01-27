import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function ProductsFilter() {
	return (
		<div className="flex items-center mb-5 justify-around ">
			<Tabs defaultValue="overview" className="w-[400px] p-5">
				<TabsList >
					<TabsTrigger value="كل المنتجات">كل المنتجات</TabsTrigger>
					<TabsTrigger value="مساحيق ومنظفات">مساحيق ومنظفات</TabsTrigger>
					<TabsTrigger value="ورقيات">ورقيات</TabsTrigger>
					<TabsTrigger value="الخردوات">الخردوات</TabsTrigger>
					<TabsTrigger value="الادوات الدرسية">الادوات الدرسية</TabsTrigger>
				</TabsList>
			</Tabs>
			<div>
				<Field orientation="horizontal">
					<Input type="search" placeholder="بحث ......" />
					<Button>بحث</Button>
				</Field>
			</div>
		</div>
	);
}
