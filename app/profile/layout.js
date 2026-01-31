import { ProfileTaps } from "../_components/ProfileTaps";

async function layout({ children }) {
	return (
		<main className="  lg:grid lg:grid-cols-8 gap-5 w-full">
			<nav className=" lg:col-start-1 lg:col-end-3  rounded-xl flex justify-center p-4 bg-[var(--color-three)]">
				<ProfileTaps />
			</nav>
			<section className="flex justify-center lg:col-start-4 lg:col-end-9  rounded-xl p-4 ">
				{children}
			</section>
		</main>
	);
}

export default layout;
