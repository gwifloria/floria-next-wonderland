"use client";
import { Button, Modal, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { useSWR, useSWRMutation } from "@/api/useFetch";
import matter from "gray-matter";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

export const MarkdownUpload = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
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

        await trigger({
          title: parsed.title,
          content: parsed.content,
          metadata: parsed.data,
        });

        onSuccess?.(parsed);
        message.success(`${fileObj.name} uploaded successfully.`);
      } catch (error) {
        onError?.(new Error("Failed to process file"));
        message.error(`Failed to process ${(file as File).name}`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const { trigger } = useSWRMutation("/floria-service/markdown/add", {
    method: "POST",
  });
  return (
    <div className="fixed right-0 flex justify-between items-center mb-4">
      <Button
        icon={<PlusOutlined />}
        onClick={() => setIsUploadModalOpen(true)}
      >
        New
      </Button>
      <Modal
        title="Upload Markdown"
        open={isUploadModalOpen}
        onCancel={() => setIsUploadModalOpen(false)}
        footer={null}
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
