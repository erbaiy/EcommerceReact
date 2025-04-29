import { useState, useRef, useEffect } from "react";
import { Upload, X, Crop as CropIcon } from "lucide-react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageUpload = ({ name, label, onChange, t, error }) => {
  const [preview, setPreview] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        onChange({ target: { name, value: null, error: "File size exceeds 5MB limit" } });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      onChange({ target: { name, value: file, error: null } });
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setMetadata(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onChange({ target: { name, value: null, error: null } });
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const getCroppedImg = () => {
    if (!completedCrop || !imgRef.current) return;

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    canvas.toBlob((blob) => {
      if (blob) {
        const croppedFile = new File([blob], "cropped-image.jpg", {
          type: "image/jpeg",
        });
        onChange({ target: { name, value: croppedFile, error: null } });
        setPreview(URL.createObjectURL(blob));
        setIsCropping(false);
      }
    }, "image/jpeg");
  };

  useEffect(() => {
    if (preview) {
      const img = new Image();
      img.onload = () => {
        setMetadata({
          width: img.width,
          height: img.height,
          aspectRatio: (img.width / img.height).toFixed(2),
          size: ((preview.length * 0.75) / 1024).toFixed(2) + " KB",
        });
      };
      img.src = preview;
    }
  }, [preview]);

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative border-2 border-dashed bg-orange-100 border-primary dark:bg-slate-800 rounded-md p-4 text-center cursor-pointer hover:border-primary/80 transition-colors"
        >
          <input
            type="file"
            id={name}
            name={name}
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-slate-50 opacity-50 rounded-lg"></div>
              <motion.button
                onClick={handleRemoveImage}
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-slate-900/50 text-white rounded-full p-2 hover:bg-slate-800 transition-colors"
                type="button"
              >
                <X size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsModalOpen(true)}
                className="absolute top-2 right-2 bg-slate-900/50 text-white rounded-full p-2 hover:bg-slate-800 transition-colors"
                type="button"
              >
                <CropIcon size={20} />
              </motion.button>
              {metadata && (
                <div className="absolute bottom-4 left-2 text-xs text-white">
                  <p>
                    {metadata.width}x{metadata.height}px | {metadata.size}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center h-48"
              onClick={handleUploadClick}
            >
              <Upload className="w-12 h-12 text-orange-500 mb-2" />
              <p className="text-gray-500 dark:text-gray-400">
                {t("Upload Image")}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-800 bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-md border border-slate-200 dark:border-slate-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{t("Crop Image")}</h2>
            <div className="max-h-[60vh] overflow-hidden">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                style={{ maxHeight: "100%", width: "auto" }}
              >
                <img
                  className="rounded-md max-w-full h-auto"
                  ref={imgRef}
                  src={preview}
                  alt="Crop preview"
                  style={{ maxHeight: "60vh", width: "auto" }}
                />
              </ReactCrop>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 font-semibold bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded mr-2"
              >
                {t("Cancel")}
              </button>
              <button
                onClick={() => {
                  getCroppedImg();
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 font-semibold bg-primary text-white rounded"
              >
                {t("Apply Crop")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ImageUpload.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default ImageUpload;