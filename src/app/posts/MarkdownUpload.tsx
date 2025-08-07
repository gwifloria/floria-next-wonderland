"use client";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { App, Modal, Upload } from "antd";
import matter from "gray-matter";
import { useState } from "react";
import { useMarkdown } from "./useMarkdown";
const { Dragger } = Upload;

export const MarkdownUpload = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { message } = App.useApp(); // Use App.useApp instead of direct Modal usage

  const { addPost, isPosting, getMarkdownList } = useMarkdown();

  const parseMarkdownFile = (
    file: File,
  ): Promise<{ title: string; content: string; data: any }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const content = reader.result as string;
          const { data, content: parsedContent } = matter(content);
          const title = data.title || file.name.replace(/\.md$/, "");

          resolve({
            title,
            content: parsedContent,
            data: {
              ...data,
              title,
              date: data.date || new Date().toISOString(),
            },
          });
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    accept: ".md,.markdown",
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const fileObj = file as File;
        const parsed = await parseMarkdownFile(fileObj);

        await addPost({
          title: parsed.title,
          content: parsed.content,
          metadata: parsed.data,
        });

        onSuccess?.(parsed);
        getMarkdownList();
        message.success(`${fileObj.name} uploaded successfully.`);
        setIsUploadModalOpen(false);
      } catch (error) {
        onError?.(new Error("Failed to process file"));
        message.error(`Failed to process ${(file as File).name}`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div className="fixed right-0 flex justify-between items-center mb-4">
      <button
        onClick={() => setIsUploadModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg
          bg-gradient-to-r from-mint-500 to-mint-600
          hover:from-mint-600 hover:to-mint-700
          text-white font-medium text-sm
          transition-all duration-300 ease-in-out
          hover:shadow-lg hover:-translate-y-0.5
          focus:outline-none focus:ring-2 focus:ring-mint-500 focus:ring-opacity-50"
      >
        <PlusOutlined className="text-md" />
        <span>New</span>
      </button>
      <Modal
        title="Upload Markdown"
        open={isUploadModalOpen}
        onCancel={() => setIsUploadModalOpen(false)}
        footer={null}
        loading={isPosting}
      >
        <div className="max-w-2xl mx-auto p-6">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag markdown file to upload
            </p>
            <p className="ant-upload-hint">
              Support for single markdown file upload. Strictly prohibited from
              uploading company data or other band files.
            </p>
          </Dragger>
        </div>
      </Modal>
    </div>
  );
};
