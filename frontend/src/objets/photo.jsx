/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, message } from "antd";
import axiosClient from "../axiosClient";
import { useStateContext } from "../context/ContextProvider";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const App = () => {
  const { membre_connected } = useStateContext();
  const ID_Membre = membre_connected.ID_Membre;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const TEST_PHOTO_PATH = 'uploads\\1718056782581.jpg';

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        // Construct the photo URL based on the constant path
        const photoUrl = `http://localhost:8000/${TEST_PHOTO_PATH}`;

        // Optionally, fetch the photo data to verify it exists
        const response = await axiosClient.get(photoUrl, { responseType: 'blob' });
        if (response.status === 200) {
          setFileList([
            {
              uid: '-1',
              name: 'photo.png',
              status: 'done',
              url: photoUrl,
            },
          ]);
        } else {
          console.error("Error fetching member photo:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching member photo:", error);
      }
    };

    fetchPhoto();
  }, [ID_Membre]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await axiosClient.put(
        `/Update_membre_photo/${ID_Membre}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success("Photo uploaded successfully!");
      setFileList([
        {
          uid: '-1',
          name: 'photo.png',
          status: 'done',
          url: `http://localhost:8000/${response.data.membre.Photo}`,
        },
      ]);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la photo du membre:",
        error
      );
      message.error("Error uploading photo");
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <>
      <Upload
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={({ file, onSuccess }) => {
          handleUpload(file).then(() => onSuccess("ok"));
        }}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default App;
