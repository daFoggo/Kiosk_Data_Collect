import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, { message: "Vui lòng nhập tên" }),
  identity_code: z.string().min(9, { message: "Mã CCCD không hợp lệ" }),
  role: z.enum(["student", "officer", "guest"], {
    required_error: "Vui lòng chọn vai trò",
  }),
  department_code: z.string().optional(),
  personal_code: z.string().optional(),
  dobDay: z.string().min(1, { message: "Chọn ngày" }),
  dobMonth: z.string().min(1, { message: "Chọn tháng" }),
  dobYear: z.string().min(1, { message: "Chọn năm" }),
  gender: z.enum(["nam", "nu"], { required_error: "Vui lòng chọn giới tính" }),
  images: z
    .array(z.instanceof(File))
    .min(1, { message: "Vui lòng tải ít nhất 1 ảnh" })
    .max(3, { message: "Tối đa 3 ảnh" }),
});
