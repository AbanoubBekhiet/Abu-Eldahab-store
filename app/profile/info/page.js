"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	InputGroupTextarea,
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileData } from "@/app/_libs/APIs";
import { toast } from "react-toastify";
import { setUser } from "@/app/store/authSlice";

/* ---------------- Schema ---------------- */
const formSchema = z.object({
	full_name: z
		.string()
		.min(2, "لا يجب ان يقل الاسم عن 5 احرف")
		.max(30, "لا يجب ان يتخطي الاسم 30 حرف"),
	phone: z.string().length(11, "ادخل رقم هاتف صالح"),
	shop_name: z
		.string()
		.min(5, "لا يجب ان يقل اسم المحل عن 5 احرف")
		.max(30, "اسم المحل لا يجب ان يتخطي ال 30 حرف"),
	address: z
		.string()
		.min(10, "لا يجب ان يقل العنوان عن 10 احرف")
		.max(100, "لا يجب ان يتخطي العنوان 100 حرف"),
	notes: z.string().max(100, "لا يجب ان تتخطي الملاحظات ال 100 حرف").optional(),
});

/* ---------------- Page ---------------- */
export default function Page() {
	const dispatch = useDispatch();
	const userProfile = useSelector((state) => state.auth);
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			full_name: "",
			phone: "",
			shop_name: "",
			address: "",
			notes: "لا يوجد",
		},
	});

	async function onSubmit(data) {
		try {
			const result = await updateProfileData(data);
			dispatch(setUser(result));
			toast.success("تم تحديث بياناتك بنجاح");
		} catch (error) {
			toast.error("حدث خطأ أثناء التحديث");
		}
	}

	React.useEffect(() => {
		if (!userProfile) return;

		form.reset({
			full_name: userProfile.full_name ?? "",
			phone: userProfile.phone ?? "",
			shop_name: userProfile.shop_name ?? "",
			address: userProfile.address ?? "",
			notes: userProfile.notes ?? "لا يوجد",
		});
	}, [userProfile, form]);

	return (
		<Card className="w-full sm:max-w-md text-[var(--color-one)]" dir="rtl">
			<CardHeader>
				<CardTitle>بيانات العميل</CardTitle>
			</CardHeader>

			<CardContent>
				<form id="customer_info" onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							name="full_name"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="full_name">اسم العميل</FieldLabel>
									<Input
										{...field}
										id="full_name"
										placeholder=" ادخل الاسم"
										aria-invalid={fieldState.invalid}
									/>
									{fieldState.error && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="phone"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="phone">رقم الهاتف</FieldLabel>
									<Input
										{...field}
										id="phone"
										placeholder=" ادخل رقم الهاتف"
										aria-invalid={fieldState.invalid}
									/>
									{fieldState.error && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name="shop_name"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="shop_name">اسم المحل</FieldLabel>
									<Input
										{...field}
										id="shop_name"
										placeholder=" ادخل اسم المحل"
										aria-invalid={fieldState.invalid}
									/>
									{fieldState.error && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="address"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="address">عنوان المحل</FieldLabel>

									<InputGroup>
										<InputGroupTextarea
											{...field}
											id="address"
											rows={6}
											className="min-h-24 resize-none"
											placeholder="ادخل العنوان التفصيلي للمحل"
											aria-invalid={fieldState.invalid}
										/>
										<InputGroupAddon align="block-end">
											<InputGroupText className="tabular-nums">
												{field.value?.length ?? 0}/100
											</InputGroupText>
										</InputGroupAddon>
									</InputGroup>

									{fieldState.error && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name="notes"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="notes">ملاحظات</FieldLabel>

									<InputGroup>
										<InputGroupTextarea
											{...field}
											id="notes"
											rows={6}
											className="min-h-24 resize-none"
											placeholder="ادخل ملاحظات"
											aria-invalid={fieldState.invalid}
										/>
										<InputGroupAddon align="block-end">
											<InputGroupText className="tabular-nums">
												{field.value?.length ?? 0}/100
											</InputGroupText>
										</InputGroupAddon>
									</InputGroup>

									{fieldState.error && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
			</CardContent>

			<CardFooter>
				<Field orientation="horizontal">
					<Button type="button" variant="outline" onClick={() => form.reset()}>
						مسح
					</Button>

					<Button type="submit" form="customer_info">
						تحديث البيانات
					</Button>
				</Field>
			</CardFooter>
		</Card>
	);
}
