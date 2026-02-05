"use client";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { deleteCartProduct, updateCartProduct } from "../_libs/APIs";
import { removeFromCart, updateItem } from "../store/cartSlice";
import { toast } from "react-toastify";
import default_image from "@/public/default_image.webp";

const image_path =
	"https://vyojzehexdatndltudup.supabase.co/storage/v1/object/public/products_images";

function ProductCartCard({ product }) {
	const dispatch = useDispatch();
	function onRemove() {
		dispatch(removeFromCart(product.product_id));
		deleteCartProduct(product.product_id, product.user_id);
		toast.success("تم إزالة المنتج من السلة");
	}
	function onDecreasePackets() {
		if (product.number_of_packets === 0) {
			toast.warn("عدد العبوات صفر بالفعل");
		} else {
			dispatch(
				updateItem({
					product_id: product.product_id,
					number_of_packets: product.number_of_packets - 1,
					number_of_pieces: product.number_of_pieces,
				}),
			);
			updateCartProduct(
				product.product_id,
				product.user_id,
				product.number_of_packets - 1,
				product.number_of_pieces,
			);
		}
	}
	function onIncreasePackets() {
		dispatch(
			updateItem({
				product_id: product.product_id,
				number_of_packets: product.number_of_packets + 1,
				number_of_pieces: product.number_of_pieces,
			}),
		);

		updateCartProduct(
			product.product_id,
			product.user_id,
			product.number_of_packets + 1,
			product.number_of_pieces,
		);
	}
	function onDecreasePieces() {
		if (product.number_of_pieces === 0) {
			toast.warn("عدد القطع صفر بالفعل");
		} else {
			dispatch(
				updateItem({
					product_id: product.product_id,
					number_of_packets: product.number_of_packets,
					number_of_pieces: product.number_of_pieces - 1,
				}),
			);
			updateCartProduct(
				product.product_id,
				product.user_id,
				product.number_of_packets,
				product.number_of_pieces - 1,
			);
		}
	}
	function onIncreasePieces() {
		dispatch(
			updateItem({
				product_id: product.product_id,
				number_of_packets: product.number_of_packets,
				number_of_pieces: product.number_of_pieces + 1,
			}),
		);

		updateCartProduct(
			product.product_id,
			product.user_id,
			product.number_of_packets,
			product.number_of_pieces + 1,
		);
	}

	function totalPriceOfProduct() {
		return (
			product?.number_of_pieces * product?.price_of_piece +
			product?.number_of_packets * product?.price_of_packet
		);
	}

	return (
		<div className="w-rounded-xl border border-gray-200 bg-white p-5 shadow-xl rounded-2xl h-96">
			<div className="flex items-start justify-between gap-3">
				<div className="flex-1 text-right">
					<h3 className="text-xl font-bold text-gray-800 w-20">
						{product.name}
					</h3>

					<p className="mt-3 text-lg text-[var(--color-one)]">
						{product.price_of_packet} ج.م / عبوة
					</p>
				</div>

				<div className="relative">
					<div className="relative h-28 w-28 overflow-hidden rounded-lg">
						<Image
							src={
								product?.image_url
									? `${image_path}/${product.image_url.trim()}` 
									: default_image
							}
							fill
							alt={product?.name ?? "Product image"}
							sizes="64px"
							className="object-cover brightness-90"
						/>
					</div>

					<span className="absolute -bottom-2 -left-2 rounded-full bg-[var(--color-two)] px-2 py-0.5 text-md font-bold text-white">
						x{product.number_of_pieces_in_packet}
					</span>
				</div>
			</div>

			<div className="mt-6 flex flex-col gap-6 ">
				<div>
					<div className="flex items-center justify-around  gap-2 rounded-lg border border-[var(--color-one)] text-[var(--color-one)] px-9 py-2 mb-4">
						<button
							onClick={onDecreasePackets}
							className="rounded-md bg-gray-100 p-1 hover:bg-gray-200"
						>
							<Minus size={16} />
						</button>

						<span className="min-w-[24px] text-center text-lg font-bold">
							{product.number_of_packets} عبوة
						</span>

						<button
							onClick={onIncreasePackets}
							className="rounded-md bg-gray-100 p-1 hover:bg-gray-200"
						>
							<Plus size={16} />
						</button>
					</div>
					<div>
						<div className="flex items-center justify-around  gap-2 rounded-lg border border-[var(--color-one)] text-[var(--color-one)] px-9 py-2 mb-4">
							<button
								onClick={onDecreasePieces}
								className="rounded-md bg-gray-100 p-1 hover:bg-gray-200"
							>
								<Minus size={16} />
							</button>

							<span className="min-w-[24px] text-center text-lg font-bold">
								{product.number_of_pieces} قطعة
							</span>

							<button
								onClick={onIncreasePieces}
								className="rounded-md bg-gray-100 p-1 hover:bg-gray-200"
							>
								<Plus size={16} />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col ">
				<div className="my-2 text-right text-lg font-bold text-[var(--color-one)] ">
					إجمالي سعر المنتج : {totalPriceOfProduct()} ج.م
				</div>
				<button
					onClick={onRemove}
					className=" flex items-center justify-center gap-1 rounded-md border border-red-500 px-2 py-1 text-lg font-bold text-red-500 hover:bg-red-50 m-auto"
				>
					<Trash2 size={20} />
					إزالة
				</button>
			</div>
		</div>
	);
}

export default ProductCartCard;
