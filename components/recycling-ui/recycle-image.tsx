"use client";
import { verifyImage } from "@/endpoints/authApi";
import { useMutation } from "@tanstack/react-query";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaUpload } from "react-icons/fa";
import RecycleDetails from "./recycle-details";
import BtnLoading from "../common/btn-loading";

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
    onSuccess: (data) => {
      if (fileInputRef.current) {
        fileInputRef.current.files = null;
      }
      setFileUrl("");
      if (data.isSuccess && data?.hash) {
        toast.success("Verified! Reward sent to your wallet.", {
          position: "top-right",
        });
      } else {
        toast.error(data?.error || "Not verified! Please try again.", {
          position: "top-right",
        });
      }
    },
    onError: (error) => {
      toast.error("Something went wrong! Please try again.", {
        position: "top-right",
      });
      console.log(error);
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

  return (
    <form
      onSubmit={handleUploadAndVerify}
      className="card bg-base-300 rounded-box grid grow place-items-center py-6"
    >
      <div className="card bg-base-100 w-80 lg:w-96 shadow-sm">
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
        disabled={isPending}
        onClick={handleUploadAndVerify}
        className="btn btn-lg btn-wide mt-4 bg-neutral"
      >
        {isPending && <BtnLoading />}
        Submit proof
      </button>

      {data && isSuccess && (
        <RecycleDetails
          is_recycle={data.message.is_recycle}
          confidence={data.message.confidence}
          hash={data.hash}
          proof_extracts={data.message.proof_extracts}
          reasons={data.message.reasons}
        />
      )}
    </form>
  );
};

export default RecycleImage;
