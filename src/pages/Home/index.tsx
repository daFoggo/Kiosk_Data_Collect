import React, { useState, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { motion } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router";

import { Loader2, MoveRight, Undo2 } from "lucide-react";
import ParticlesBackground from "@/components/ui/particles-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { updateIdentifyDataIp } from "@/utils/ip";
import { CLASSES, DEPARTMENTS, formSchema } from "./constant";
import { IFormData } from "@/models/ImageUpload/type";
import { ImageUploadStep } from "@/components/ImageUploadStep";

const Home = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const navigate = useNavigate();

  const form = useForm<IFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      identity_code: "",
      role: undefined,
      department: "",
      dobDay: "",
      dobMonth: "",
      dobYear: "",
      gender: undefined,
      images: [],
    },
  });

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    addImages(files);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        addImages(files);
      }
    },
    []
  );

  const addImages = useCallback(
    (files: File[]) => {
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));
      setUploadedImages((prev) => {
        const newImages = [...prev, ...imageFiles].slice(0, 3);
        form.setValue("images", newImages);
        return newImages;
      });
    },
    [form]
  );

  const removeImage = useCallback(
    (index: number) => {
      setUploadedImages((prev) => {
        const newImages = prev.filter((_, i) => i !== index);
        form.setValue("images", newImages);
        return newImages;
      });
    },
    [form]
  );

  const onSubmit = useCallback(async (data: IFormData) => {
    const convertToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    };

    try {
      const formattedDob = `${data.dobDay}/${data.dobMonth}/${data.dobYear}`;
      const base64Images = await Promise.all(data.images.map(convertToBase64));

      const formattedData = {
        b64_img: base64Images,
        cccd: {
          "Identity Code": data.identity_code,
          Name: data.name,
          DOB: formattedDob,
          Gender: data.gender,
        },
        role: data.role,
        ...(data.role === "officer" && data.department
          ? { department: data.department }
          : {}),
      };

      await axios.post(updateIdentifyDataIp, formattedData);
      toast.success("Đã tải ảnh thành công");
      localStorage.setItem("isUploaded", "true");
      localStorage.setItem("userName", formattedData.cccd.Name);
      localStorage.setItem("gender", formattedData.cccd.Gender);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Đã xảy ra lỗi khi tải ảnh");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <ParticlesBackground />
      <main className="flex-grow relative z-10 flex justify-center items-center p-1 sm:p-0">
        {localStorage.getItem("isUploaded") ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-background rounded-lg p-4 sm:p-8 flex flex-col items-center gap-4"
          >
            <h1 className="font-bold text-2xl sm:text-5xl text-center">
              Cảm ơn người dùng {localStorage.getItem("userName")} đã đóng góp
            </h1>
            <p className="text-lg sm:text-3xl font-semibold text-muted-foreground text-center">
              Dữ liệu của bạn sẽ giúp chúng tôi cải thiện khả năng nhận diện của
              trợ lý ảo
            </p>
            <Button
              onClick={() => {
                localStorage.removeItem("isUploaded");
                localStorage.removeItem("userName");
                localStorage.removeItem("gender");
                navigate("/");
              }}
            >
              Sửa lại dữ liệu
              <Undo2 />
            </Button>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-2xl sm:text-6xl text-center font-semibold">
              Tải lên dữ liệu nhận diện của bạn
            </h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 justify-between px-6 py-3 w-fit">
                  <p>Bắt đầu tải ảnh</p>
                  <MoveRight />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95%] sm:w-[625px] rounded-lg">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    {currentStep === 1 ? (
                      <ImageUploadStep
                        control={form.control}
                        uploadedImages={uploadedImages}
                        handleDragOver={handleDragOver}
                        handleDrop={handleDrop}
                        handleFileInput={handleFileInput}
                        removeImage={removeImage}
                        setCurrentStep={setCurrentStep}
                        setIsDialogOpen={setIsDialogOpen}
                      />
                    ) : (
                      <>
                        <DialogHeader>
                          <DialogTitle>Thông tin bổ sung</DialogTitle>
                          <DialogDescription>
                            Vui lòng điền các thông tin sau.
                          </DialogDescription>
                        </DialogHeader>

                        {/* Name Field */}
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Họ và tên</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Nhập tên của bạn"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Identity Code Field */}
                        <FormField
                          control={form.control}
                          name="identity_code"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mã CCCD</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Nhập mã CCCD của bạn"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Role Field */}
                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Vai trò</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Chọn vai trò" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="student">
                                    Sinh viên
                                  </SelectItem>
                                  <SelectItem value="officer">
                                    Cán bộ
                                  </SelectItem>
                                  <SelectItem value="guest">Khách</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Conditional Department/Class Field */}
                        {(form.watch("role") === "officer" ||
                          form.watch("role") === "student") && (
                          <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {form.watch("role") === "officer"
                                    ? "Phòng ban"
                                    : "Lớp"}
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue
                                        placeholder={
                                          form.watch("role") === "officer"
                                            ? "Chọn phòng ban"
                                            : "Chọn lớp"
                                        }
                                      />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {form.watch("role") === "officer"
                                      ? DEPARTMENTS.map((dept) => (
                                          <SelectItem
                                            key={dept.value}
                                            value={dept.value}
                                          >
                                            {dept.label}
                                          </SelectItem>
                                        ))
                                      : CLASSES.map((cls) => (
                                          <SelectItem
                                            key={cls.value}
                                            value={cls.value}
                                          >
                                            {cls.label}
                                          </SelectItem>
                                        ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {/* Date of Birth Fields */}
                        <div className="grid grid-cols-3 gap-2">
                          {/* Day Select */}
                          <FormField
                            control={form.control}
                            name="dobDay"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Ngày</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Ngày" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {Array.from(
                                      { length: 31 },
                                      (_, i) => i + 1
                                    ).map((day) => (
                                      <SelectItem
                                        key={day}
                                        value={day.toString().padStart(2, "0")}
                                      >
                                        {day}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Month Select */}
                          <FormField
                            control={form.control}
                            name="dobMonth"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tháng</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Tháng" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {Array.from(
                                      { length: 12 },
                                      (_, i) => i + 1
                                    ).map((month) => (
                                      <SelectItem
                                        key={month}
                                        value={month
                                          .toString()
                                          .padStart(2, "0")}
                                      >
                                        {month}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Year Select */}
                          <FormField
                            control={form.control}
                            name="dobYear"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Năm</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Năm" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {Array.from(
                                      { length: 100 },
                                      (_, i) => new Date().getFullYear() - i
                                    ).map((year) => (
                                      <SelectItem
                                        key={year}
                                        value={year.toString()}
                                      >
                                        {year}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Gender Field */}
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Giới tính</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Chọn giới tính" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="nam">Nam</SelectItem>
                                  <SelectItem value="nu">Nữ</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Navigation Buttons */}
                        <div className="flex justify-end gap-4 mt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCurrentStep(1)}
                          >
                            Quay lại
                          </Button>
                          <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                          >
                            {form.formState.isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Đang xử lý
                              </>
                            ) : (
                              "Xác nhận"
                            )}
                          </Button>
                        </div>
                      </>
                    )}
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
