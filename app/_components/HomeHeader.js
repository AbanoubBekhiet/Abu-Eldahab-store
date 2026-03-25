"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import CountUp from "react-countup";

function HomeHeader() {
	return (
		<section className="bg-[var(--color-three)] px-6 py-12 rounded-2xl w-full">
			<section>
				<Empty>
					<EmptyHeader>
						<EmptyTitle className="text-[var(--color-one)] flex flex-col">
							<span className="text-3xl">هتلاقي احتياجات محلك عند</span>
							<span className="text-6xl text-yellow-600">ابو الدهب</span>
						</EmptyTitle>
						<EmptyDescription>
							هتلاقي عندنا جميع انواع الخردوات , الورقيات ,المنظفات, والادوات
							المدرسية
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Link href="/products" className="w-full">
							<Button
								variant="outline"
								size="sm"
								className="w-full py-6 text-2xl text-[var(--color-one)] border-[var(--color-one)]"
							>
								تسوق الان
							</Button>
						</Link>
					</EmptyContent>
				</Empty>
			</section>

			<section className="flex items-center justify-evenly [&>span]:text-[var(--color-one)] flex-wrap">
				<div className="flex flex-col items-center gap-2">
					<span className="text-[var(--color-one)] text-4xl">
						<CountUp end={1000} /> +
					</span>
					<span className="text-2xl font-extralight! text-[var(--color-one)]">
						منتج
					</span>
				</div>
				<div className="flex flex-col items-center gap-2">
					<span className="text-[var(--color-one)] text-4xl">
						<CountUp end={560} /> +
					</span>
					<span className="text-2xl font-extralight! text-[var(--color-one)]">
						عميل
					</span>
				</div>
			</section>
		</section>
	);
}

export default HomeHeader;
