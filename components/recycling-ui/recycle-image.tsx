"use client";
import { verifyImage } from "@/endpoints/authApi";
import { useMutation } from "@tanstack/react-query";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaUpload } from "react-icons/fa";

const RecycleImage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const {
    mutate: verifyImageMutation,
    isPending,
    data,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async (formData: FormData) => {
      return await verifyImage(formData);
    },
  });

  const handleSelectFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileOnChange = (e: FormEvent) => {
    e.preventDefault();
    if (!fileInputRef.current?.files?.length) {
      alert("Please select a file to upload.");
      return;
    }
    const file = fileInputRef.current.files[0];
    setFileUrl(URL.createObjectURL(file));
  };

  const handleUploadAndVerify = (e: FormEvent) => {
    e.preventDefault();
    if (!fileInputRef.current?.files?.length) {
      toast("Please select a file to upload.", { position: "top-right" });
      return;
    }
    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("image", file);
    verifyImageMutation(formData);
  };

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError]);
  return (
    <form
      onSubmit={handleUploadAndVerify}
      className="card bg-base-300 rounded-box grid grow place-items-center py-6"
    >
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure
          className="bg-base-200 w-full h-60 relative border border-dashed border-white cursor-pointer"
          onClick={handleSelectFile}
        >
          <input
            onChange={(e) => handleFileOnChange(e)}
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/**"
          />
          <div className="absolute flex flex-col items-center">
            <FaUpload className=" text-3xl" />
            <p>Upload proof</p>
          </div>
          {fileUrl && <img src={fileUrl} alt="Shoes" />}
        </figure>
      </div>

      <button
        onClick={handleUploadAndVerify}
        className="btn btn-lg btn-wide mt-4 bg-accent"
      >
        Submit proof
      </button>
    </form>
  );
};

export default RecycleImage;
