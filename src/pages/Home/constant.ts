import { z } from "zod";

export const DEPARTMENTS = [
  { value: "phong_ke_hoach", label: "Phòng Kế Hoạch" },
  { value: "phong_nhan_su", label: "Phòng Nhân Sự" },
  { value: "phong_tai_chinh", label: "Phòng Tài Chính" },
  { value: "phong_dao_tao", label: "Phòng Đào Tạo" },
  { value: "phong_cong_nghe", label: "Phòng Công Nghệ" },
];

export const CLASSES = [
  { value: "D23CQCC01-B", label: "D23CQCC01-B" },
  { value: "D23CQCC02-B", label: "D23CQCC02-B" },
  { value: "D23CQCC03-B", label: "D23CQCC03-B" },
  { value: "D23CQCC04-B", label: "D23CQCC04-B" },
  { value: "D24CQCC01-B", label: "D24CQCC01-B" },
  { value: "D24CQCC02-B", label: "D24CQCC02-B" },
  { value: "D24CQCC03-B", label: "D24CQCC03-B" },
  { value: "D24CQCC04-B", label: "D24CQCC04-B" },
  { value: "D24CQCC05-B", label: "D25CQCC05-B" },
  { value: "D24CQCC06-B", label: "D25CQCC06-B" },
];

export const formSchema = z.object({
  name: z.string().min(2, { message: "Vui lòng nhập tên" }),
  identity_code: z.string().min(9, { message: "Mã CCCD không hợp lệ" }),
  role: z.enum(["student", "officer", "guest"], {
    required_error: "Vui lòng chọn vai trò",
  }),
  department: z.string().optional(),
  dobDay: z.string().min(1, { message: "Chọn ngày" }),
  dobMonth: z.string().min(1, { message: "Chọn tháng" }),
  dobYear: z.string().min(1, { message: "Chọn năm" }),
  gender: z.enum(["nam", "nu"], { required_error: "Vui lòng chọn giới tính" }),
  images: z
    .array(z.instanceof(File))
    .min(1, { message: "Vui lòng tải ít nhất 1 ảnh" })
    .max(3, { message: "Tối đa 3 ảnh" }),
});
