"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCartCard from "@/app/_components/ProductCartdCart";
import { Button } from "@/components/ui/button";
import { BanknoteX, Van, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { deleteCartItems, makeOrder } from "../_libs/APIs";
import { toast } from "react-toastify";
import { clearCart } from "@/app/store/cartSlice";
import { useRouter } from "next/navigation";
import EmptyCart from "../_components/EmptyCart";

function Cart() {
    const items = useSelector((state) => state.cart.items);
    const user_data = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();
    
    const [isProcessing, setIsProcessing] = useState(false);

    function calculateTotalPriceOfOrder() {
        const total = items.reduce((sum, item) => {
            return (
                sum +
                item.price_of_piece * item.number_of_pieces +
                item.price_of_packet * item.number_of_packets
            );
        }, 0);
        return total.toFixed(2);
    }

    async function handleMakingOrder() {
        if (!user_data?.phone || !user_data?.address || !user_data?.shop_name) {
            toast.error("استكمل بيانات التوصيل اولا في حسابك");
            setTimeout(() => {
                router.push("/profile/info");
            }, 300);
            return;
        }

        if (items.length === 0) {
            toast.error("لا يوجد منتجات في السلة");
            return;
        }

        try {
            setIsProcessing(true);

            const total_price = parseFloat(calculateTotalPriceOfOrder());
            await makeOrder(total_price, items);
            await deleteCartItems();
            
            dispatch(clearCart());
            toast.success("تم حفظ الطلب راقب حالة الطلب في صفحة الطلبات");
            
            setTimeout(() => {
                router.push("/profile/orders");
            }, 300);
        } catch (error) {
            console.error("Order failed:", error);
            toast.error("حدث خطأ أثناء حفظ الطلب. يرجى المحاولة مرة أخرى.");
        } finally {
            // إعادة تفعيل الزر في حالة الفشل فقط (لأن النجاح سينتقل لصفحة أخرى)
            setIsProcessing(false);
        }
    }

    if (items.length === 0) return <EmptyCart />;

    return (
        <div className="flex flex-col lg:grid lg:grid-cols-4  w-full mx-4 p-5 lg:gap-6 ">
            <section className="col-start-1 col-end-4  flex gap-2 flex-wrap justify-center">
                {items.map((item) => (
                    <ProductCartCard product={item} key={item.product_id} />
                ))}
            </section>
            
            <section className="mt-5 w-full p-5 lg:col-start-4 lg:col-end-5 shadow-xl rounded-2xl bg-white text-[var(--color-one)]">
                <h3 className="text-3xl font-bold ">ملخص الطلب</h3>
                <Separator className="my-5 " />

                <ul className="text-2xl">
                    <li className="flex justify-between items-center mb-4">
                        <span>إجمالي السعر:</span>
                        <span className="font-extrabold text-green-600">
                            {calculateTotalPriceOfOrder()} ج.م
                        </span>
                    </li>
                    <li className="flex items-center gap-4 text-sm text-gray-500">
                        <span>التوصيل مجاني</span> <BanknoteX size={18} />
                    </li>
                </ul>
                
                <Separator className="my-5 " />

                <div className="flex flex-col">
                    <p className="my-8 text-lg text-center text-gray-600 italic">
                        يصلك الطلب في خلال يوم أو اثنين بحد أقصى بعد تأكيد الطلب
                    </p>

                    <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full py-6 text-xl font-bold transition-all"
                        onClick={handleMakingOrder}
                        disabled={isProcessing}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="ml-2 h-6 w-6 animate-spin" />
                                جاري تأكيد الطلب...
                            </>
                        ) : (
                            <>
                                <Van className="ml-2" /> إتمام الطلب
                            </>
                        )}
                    </Button>
                </div>
            </section>
        </div>
    );
}

export default Cart;