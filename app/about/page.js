import { Truck, MapPin, Package, School, SprayCan, ScrollText, CheckCircle } from "lucide-react";

export const metadata = {
	title: "من نحن",
	description: "تعرف على شركة ابو الدهب، رائدة تجارة المنظفات والورقيات والخردوات في الإسكندرية.",
};

export const dynamic = "force-static";

export default function AboutPage() {
	return (
		<div className="w-full min-h-screen bg-[var(--color-four)]">
			{/* Hero Section */}
			<section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-[var(--color-one)] text-white">
				<div className="absolute inset-0 opacity-20">
					<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
				</div>
				<div className="relative z-10 text-center px-4">
					<h1 className="text-5xl md:text-7xl font-bold mb-4 animate-in fade-in slide-in-from-bottom duration-1000">
						شركة ابو الدهب
					</h1>
					<p className="text-xl md:text-2xl text-[var(--color-three)] max-w-2xl mx-auto">
						شريككم الموثوق في عالم المنظفات والورقيات واللوازم المدرسية
					</p>
				</div>
			</section>

			{/* About Content */}
			<section className="max-w-6xl mx-auto px-6 py-20">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					<div className="space-y-8">
						<div className="inline-block px-4 py-2 bg-[var(--color-two)] text-white rounded-full text-sm font-semibold tracking-wide uppercase">
							قصتنا وهدفنا
						</div>
						<h2 className="text-4xl font-bold text-[var(--color-one)] leading-tight">
							رؤية جديدة في تجارة الجملة والتجزئة بالإسكندرية
						</h2>
						<p className="text-lg text-gray-700 leading-relaxed">
							إننا في شركة ابو الدهب، نفخر بكوننا أحد الأسماء الرائدة في تجارة وتوزيع المساحيق، الخردوات، الورقيات، والمنظفات بكافة أنواعها. 
							لقد بدأنا رحلتنا بهدف توفير أجود المنتجات بأسعار تنافسية، مع التركيز الكامل على تلبية احتياجات عملائنا في نطاق محافظة الإسكندرية.
						</p>
						<p className="text-lg text-gray-700 leading-relaxed">
							نحن نؤمن بأن الخدمة الممتازة تبدأ من فهم حاجة السوق المحلي. لذا، فإننا نوفر تشكيلة واسعة من الأدوات المدرسية واللوازم المكتبية التي تخدم طلابنا ومكاتبنا في الإسكندرية، إلى جانب تفوقنا في توريد المساحيق والورقيات للمنازل والمنشآت التجارية.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
								<CheckCircle className="text-[var(--color-two)] shrink-0" />
								<div>
									<h3 className="font-bold text-[var(--color-one)]">جودة مضمونة</h3>
									<p className="text-sm text-gray-600">نختار أفضل الماركات والمنتجات لضمان رضاكم.</p>
								</div>
							</div>
							<div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
								<CheckCircle className="text-[var(--color-two)] shrink-0" />
								<div>
									<h3 className="font-bold text-[var(--color-one)]">أسعار منافسة</h3>
									<p className="text-sm text-gray-600">نوفر أفضل الأسعار لتجار التجزئة والمستهلكين.</p>
								</div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-4">
							<div className="bg-[var(--color-two)] h-48 rounded-2xl flex flex-col items-center justify-center text-white p-6 text-center transform hover:scale-105 transition-transform">
								<SprayCan size={40} className="mb-3" />
								<span className="font-bold">المنظفات والمساحيق</span>
							</div>
							<div className="bg-white h-40 rounded-2xl shadow-lg border border-[var(--color-three)] flex flex-col items-center justify-center text-[var(--color-one)] p-6 text-center transform hover:scale-105 transition-transform">
								<ScrollText size={40} className="mb-3" />
								<span className="font-bold">الورقيات</span>
							</div>
						</div>
						<div className="space-y-4 mt-8">
							<div className="bg-white h-40 rounded-2xl shadow-lg border border-[var(--color-three)] flex flex-col items-center justify-center text-[var(--color-one)] p-6 text-center transform hover:scale-105 transition-transform">
								<Package size={40} className="mb-3" />
								<span className="font-bold">الخردوات</span>
							</div>
							<div className="bg-[var(--color-one)] h-48 rounded-2xl flex flex-col items-center justify-center text-white p-6 text-center transform hover:scale-105 transition-transform">
								<School size={40} className="mb-3" />
								<span className="font-bold">الأدوات المدرسية</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Service area & Delivery */}
			<section className="bg-white py-20 border-y border-[var(--color-three)]">
				<div className="max-w-6xl mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="text-3xl font-bold text-[var(--color-one)] mb-4">خدمات التوصيل والنطاق الجغرافي</h2>
						<div className="w-24 h-1 bg-[var(--color-two)] mx-auto rounded-full" />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="bg-[var(--color-four)] p-10 rounded-3xl flex flex-col items-center text-center">
							<div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
								<MapPin size={40} className="text-[var(--color-one)]" />
							</div>
							<h3 className="text-2xl font-bold text-[var(--color-one)] mb-4">نطاق الخدمة</h3>
							<p className="text-gray-600">
								نحن نغطي كافة مناطق وأحياء محافظة الإسكندرية، من أبو قير شرقاً وحتى العجمي والساحل الشمالي غرباً. 
								أينما كنت في عروس البحر المتوسط، بضاعتنا تصل لباب محلك أو منزلك.
							</p>
						</div>
						<div className="bg-[var(--color-one)] p-10 rounded-3xl flex flex-col items-center text-center text-white">
							<div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
								<Truck size={40} className="text-white" />
							</div>
							<h3 className="text-2xl font-bold mb-4">توصيل مجاني وسريع</h3>
							<p className="text-gray-200">
								نحن نقدر قيمة وقتكم، لذا نلتزم بتوصيل الطلبات مجاناً وبأقصى سرعة ممكنة. 
								تصلكم البضائع في خلال يوم واحد أو يومين بحد أقصى من تاريخ تسجيل الطلب.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 text-center px-6">
				<h2 className="text-3xl font-bold text-[var(--color-one)] mb-8">ابدأ تسوقك الآن مع ابو الدهب</h2>
				<a 
					href="/products" 
					className="inline-block px-10 py-4 bg-[var(--color-two)] text-white font-bold rounded-full hover:bg-[var(--color-one)] transition-colors shadow-lg shadow-[var(--color-two)]/30"
				>
					تصفح المنتجات
				</a>
			</section>
		</div>
	);
}
