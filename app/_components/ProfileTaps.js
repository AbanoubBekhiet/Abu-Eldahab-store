import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, PackageCheck } from "lucide-react";
import Link from "next/link";

export function ProfileTaps() {
	return (
		<Tabs defaultValue="preview" orientation="vertical">
			<TabsList> 
				<Link href="/profile/info" className=" gap-4">
					<TabsTrigger value="البيانات الشخصية" className="text-xl ">
						<FileText />
						البيانات الشخصية
					</TabsTrigger>
				</Link>
				<Link href="/profile/orders" className=" gap-4">
					<TabsTrigger value="سجل الطلبات" className="text-xl">
						<PackageCheck />
						سجل الطلبات
					</TabsTrigger>
				</Link>
			</TabsList>
		</Tabs>
	);
}
