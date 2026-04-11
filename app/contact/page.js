import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";

export const metadata = {
	title: "اتصل بنا",
	description: "تواصل مع فريق مبيعات شركة ابو الدهب للإستفسار عن المنتجات والطلبات.",
};

export const dynamic = "force-static";

export default function ContactPage() {
	const phoneNumber = "01555126141";
	const whatsappLink = `https://wa.me/20${phoneNumber.substring(1)}`;

	return (
		<div className="w-full min-h-screen bg-[var(--color-four)] py-16 px-6">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-[var(--color-one)] mb-4">اتصل بنا</h1>
					<p className="text-lg text-gray-600">يسعدنا دائماً تواصلكم معنا والإجابة على استفساراتكم</p>
					<div className="w-24 h-1 bg-[var(--color-two)] mx-auto mt-6 rounded-full" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Contact Info Card */}
					<div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center">
						<div className="w-20 h-20 bg-[var(--color-four)] rounded-full flex items-center justify-center mb-6 text-[var(--color-one)]">
							<Phone size={40} />
						</div>
						<h2 className="text-2xl font-bold text-[var(--color-one)] mb-2">قسم المبيعات</h2>
						<p className="text-3xl font-bold text-[var(--color-two)] mb-8 tracking-wider" dir="ltr">
							{phoneNumber}
						</p>
						
						<div className="w-full space-y-4">
							<a 
								href={`tel:${phoneNumber}`}
								className="flex items-center justify-center gap-3 w-full py-4 bg-[var(--color-one)] text-white font-bold rounded-2xl hover:opacity-90 transition-opacity"
							>
								<Phone size={20} />
								اتصال هاتفي
							</a>
							<a 
								href={whatsappLink}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white font-bold rounded-2xl hover:opacity-90 transition-opacity"
							>
								<MessageCircle size={20} />
								واتساب
							</a>
						</div>
					</div>

					{/* Information Card */}
					<div className="space-y-6">
						<div className="bg-white p-6 rounded-2xl shadow-md border border-gray-50 flex items-center gap-5">
							<div className="w-12 h-12 bg-[var(--color-two)]/10 text-[var(--color-two)] rounded-full flex items-center justify-center shrink-0">
								<MapPin size={24} />
							</div>
							<div>
								<h3 className="font-bold text-[var(--color-one)] text-lg">مقرنا</h3>
								<p className="text-gray-600">محافظة الإسكندرية، جمهورية مصر العربية</p>
							</div>
						</div>

						<div className="bg-white p-6 rounded-2xl shadow-md border border-gray-50 flex items-center gap-5">
							<div className="w-12 h-12 bg-[var(--color-two)]/10 text-[var(--color-two)] rounded-full flex items-center justify-center shrink-0">
								<Clock size={24} />
							</div>
							<div>
								<h3 className="font-bold text-[var(--color-one)] text-lg">ساعات العمل</h3>
								<p className="text-gray-600">يومياً من الساعة 9 صباحاً حتى 10 مساءً</p>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-16 text-center text-gray-500 italic">
					نحن ملتزمون بتقديم أفضل خدمة لعملائنا في جميع أنحاء الإسكندرية
				</div>
			</div>
		</div>
	);
}
