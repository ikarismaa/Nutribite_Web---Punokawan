import { useState, useEffect } from "react";
import axios from "axios";
import gambarGede from "/src/assets/gambarGede.jpg";
import "./style.css";
import { toast } from "react-toastify";

const HerosUser = () => {
  const [profil_pic, setProfil_pic] = useState(""); // Foto profil kosong
  const [username, setUsername] = useState(""); // Username default

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/users/current", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        const userData = response.data.user;
        setUsername(userData.username);
        setProfil_pic(userData.profil_pic);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const handleProfilPicUpload = async (file) => {
    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const response = await axios.post("http://127.0.0.1:3000/api/users/current/profilepic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.data.success) {
        toast.success("Profile picture uploaded successfully");
        setProfil_pic(response.data.profilePicUrl); // Update the state with the new profile picture URL
      } else {
        toast.error("Failed to upload profile picture");
        alert("Failed to upload profile picture");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  return (
    <>
      <div className="hero-section">
        <div className="hero-background-container">
          <img src={gambarGede} alt="Latar Belakang Hero" className="hero-background" />
          <div className="hero-overlay"></div>
        </div>
        <div className="profile">
          <div className="profile-picture-container">
            <img src={profil_pic || "default-profile-pic-url"} alt="Foto Profil" className="profile-picture" />
            <div className="profile-edit-icon">
              <label htmlFor="file-upload" className="custom-file-upload">
                <i className="fas fa-plus"></i>
              </label>
              <input id="file-upload" type="file" accept="image/*" onChange={(e) => handleProfilPicUpload(e.target.files[0])} className="profile-pic-input" />
            </div>
          </div>
          <div className="username">{username}</div>
        </div>
      </div>
    </>
  );
};

export default HerosUser;
