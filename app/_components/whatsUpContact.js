import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";

function WhatsUpContact() {
	return (
		<section
			title="تواصل معنا"
			className="fixed bottom-10 right-10 text-[var(--color-one)] text-3xl bg-[var(--color-three)] p-4 rounded-full z-50"
		>
			<Link href="https://wa.me/qr/7FMMVZRLGVMXN1">
				<BsWhatsapp />
			</Link>
		</section>
	);
}

export default WhatsUpContact;
