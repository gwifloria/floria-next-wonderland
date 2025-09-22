import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload } from "antd";
import imageCompression from "browser-image-compression";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: false,
  beforeUpload: (file) => {
    handleImageUpload(file);
    return false;
  },
};

async function handleImageUpload(imageFile: File) {
  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    await download(compressedFile);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Image compression failed:", error);
    }
  }
}

const download = (file: File) => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = file.name;
  a.style.display = "none";

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
};

const UploadBox: React.FC = () => (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading
      company data or other banned files.
    </p>
  </Dragger>
);

export default UploadBox;
