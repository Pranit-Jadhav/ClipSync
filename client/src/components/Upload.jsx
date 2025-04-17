import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const Label = styled.label`
  font-size: 14px;
`;

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadToCloudinary = async (file, type) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", type === "image" ? "images_preset" : "videos_preset");

    const cloudName = "dwotpkkwx";    // Your Cloudinary cloud name
    const resourceType = type === "image" ? "image" : "video";
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    try {
      const res = await axios.post(url, data);
      return res.data.secure_url;
    } catch (err) {
      console.error("Cloudinary Upload Error:", err);
      return null;
    }
  };

  useEffect(() => {
    const handleVideoUpload = async () => {
      if (video) {
        const url = await uploadToCloudinary(video, "video");
        if (url) setVideoUrl(url);
      }
    };
    handleVideoUpload();
  }, [video]);

  useEffect(() => {
    const handleImageUpload = async () => {
      if (img) {
        const url = await uploadToCloudinary(img, "image");
        if (url) setImgUrl(url);
      }
    };
    handleImageUpload();
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const payload = {
      ...inputs,
      tags,
      imgUrl,
      videoUrl,
    };

    try {
      const res = await axios.post("/api/videos", payload); // adjust the backend route if needed
      if (res.status === 200) {
        setOpen(false);
        navigate(`/video/${res.data._id}`);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        <Input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
        <Input type="text" placeholder="Title" name="title" onChange={handleChange} />
        <Desc placeholder="Description" name="desc" rows={8} onChange={handleChange} />
        <Input type="text" placeholder="Separate the tags with commas." onChange={handleTags} />
        <Label>Image:</Label>
        <Input type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} />
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
