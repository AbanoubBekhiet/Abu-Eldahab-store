import Image from "next/image";
import logo from "@/public/logo.jpeg";
import Link from "next/link";
function Footer() {
	return (
		<footer className="grid grid-cols-3 gap-10 bg-[var(--color-two)]">
			<div className="col-start-1 col-end-3  p-5 pb-20 flex flex-col items-center">
				<Image
					src={logo}
					alt="ابو الدهب لتجارة المنظفات ومستحضرات التجميل"
					width="100"
					height="100"
					className="rounded-full mb-5"
				/>
				<div className=" text-2xl ">
					شركة ابو الدهب هي شركة متخصصة في توزيع المنظفات و الورقيات ومستحضرات
					التجميل والخردوات و الادوات الدراسية علي مستوي محافظة الاسكندرية اطلب
					وتصلك البضائع في خلال اليوم او ثاني يوم
				</div>
			</div>
			<div className=" col-start-3 col-end-4 p-5 flex flex-col items-center">
				<p className="text-2xl">روابط سريعة</p>
				<ul className=" [&>li:hover]:-translate-x-2 [&>li]:duration-300 ">
					<li>
						<Link href="/about">من نحن</Link>
					</li>
					<li>
						<Link href="/products">المنتجات</Link>
					</li>
					<li>
						<Link href="/categories">الفئات</Link>
					</li>
					<li>
						<Link href="/offers">العروض</Link>
					</li>
					<li>
						<Link href="/profile">الملف الشخصي</Link>
					</li>
					<li>
						<Link href="/cart">سلة المشتريات</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
}

export default Footer;
