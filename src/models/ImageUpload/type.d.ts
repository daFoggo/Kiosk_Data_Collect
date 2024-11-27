export type IFormData = z.infer<typeof formSchema>;

export interface IDepartment {
    id: number;
    ma_phong_ban: string;
    ten_phong_ban: string;
}

export interface IClass {
    id: number;
    ma_lop: string;
    ten_lop: string;
}