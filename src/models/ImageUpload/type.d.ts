export type IFormData = z.infer<typeof formSchema>;

export interface IDepartment {
    id: number;
    ma_phong_ban: string;
    ten_phong_ban: string;
}

export interface IClass {
    id: string;
    ten_lop_hanh_chinh: string;
}