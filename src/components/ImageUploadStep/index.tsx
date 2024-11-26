import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FormField, FormItem, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Upload, X } from "lucide-react";

export const ImageUploadStep = ({
  control,
  uploadedImages,
  handleDragOver,
  handleDrop,
  handleFileInput,
  removeImage,
  setCurrentStep,
  setIsDialogOpen,
}: {
  control: any;
  uploadedImages: File[];
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  setCurrentStep: (step: number) => void;
  setIsDialogOpen: (open: boolean) => void;
}) => (
  <div className="space-y-4">
    <DialogHeader>
      <DialogTitle>Tải lên 1 - 3 hình ảnh chân dung</DialogTitle>
      <DialogDescription>{/* Image upload instructions */}</DialogDescription>
    </DialogHeader>

    <FormField
      control={control}
      name="images"
      render={() => (
        <FormItem>
          <div
            className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            {uploadedImages.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Đã tải ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                      className="absolute top-1 right-1 bg-background rounded-full p-1"
                      aria-label={`Remove image ${index + 1}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {uploadedImages.length < 3 && (
                  <div className="flex items-center justify-center border-2 border-dashed rounded-md h-32">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Kéo và thả hoặc nhấp để chọn hình ảnh
                </p>
              </div>
            )}
            <input
              id="file-input"
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileInput}
            />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />

    <div className="flex justify-end gap-4 mt-4">
      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
        Hủy
      </Button>
      <Button
        onClick={() => setCurrentStep(2)}
        disabled={uploadedImages.length === 0}
      >
        Tiếp tục
      </Button>
    </div>
  </div>
);
