import React, { useRef, useState } from "react";
import { clip } from "../../helper/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import Loader from "../../shared/components/Loader";

export default function ImageUploader(props) {
  const { images, setImages, doc, docs, setDocs } = props;
  const fileInputRef = useRef(null);
  const [medialoading, setMediaLoading] = useState(false);
  const [docLoading, setDocLoading] = useState(false);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const uploadMedia = async (images) => {
    try {
      setMediaLoading(true);
      const storageRef = ref(storage, `images/${images.name}`);
      const upload = await uploadBytes(storageRef, images);
      const url = await getDownloadURL(storageRef);
      setMediaLoading(false);
      return {url, name: upload?.metadata?.fullPath};
    } catch (error) {
      return false;
    }
  };

  const uploadDocument = async (images) => {
    try {
      setDocLoading(true);
      const storageRef = ref(storage, `pitch/${images.name}`);
      const upload = await uploadBytes(storageRef, images);
      const url = await getDownloadURL(storageRef);
      setDocLoading(false);
      return {url, name: upload?.metadata?.fullPath};
    } catch (error) {
      return false;
    }
  };
  const handleChange = async (e) => {
    try {
      if (!doc) {
        const url = await uploadMedia(e.target.files[0]);
        setImages([...images, url]);
        // setImages(e.target.files[0]);
      } else {
        const url = await uploadDocument(e.target.files[0]);
        setDocs(url);
      }
    } catch (error) {
      console.log("error while uploading document", error);
    }
  };
  return (
    <div className="">
      {doc ? (
        <div
          className="cursor-pointer p-2 rounded-md border lg:w-[360px] w-[100%] flex justify-between"
          onClick={handleClick}
        >
          <div>{docs?.name?.split('/')[1] ?? "Upload a file"}</div>
          {docLoading ? (
            <div>
              <Loader className={"my-0"} />
            </div>
          ) : (
            <img src={clip} height={20} width={20} />
          )}
          <input
            type="file"
            name="file"
            multiple={!doc}
            onChange={handleChange}
            accept="application/pdf"
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </div>
      ) : (
        <div
          className="h-[100px] w-[100px] flex flex-col rounded-lg outline-dotted outline-2 cursor-pointer "
          onClick={handleClick}
        >
          {medialoading ? (
            <div className=" h-[100%] justify-center align-middle flex">
              <Loader className={"my-8"} />
            </div>
          ) : (
            <div className="flex align-middle justify-center flex-col h-[100%] ">
              <p className="text-center">+</p>
              <p className=" text-center">Upload</p>
            </div>
          )}
          <input
            type="file"
            name="file"
            multiple={!doc}
            onChange={handleChange}
            accept="image/*, video/*"
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </div>
      )}
    </div>
  );
}
