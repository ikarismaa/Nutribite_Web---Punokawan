import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BuatArtikel = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    judul: "",
    gambar: null,
    deskripsi: "",
  });
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData({ ...formData, gambar: file });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("judul", formData.judul);
    data.append("gambar", formData.gambar);
    data.append("deskripsi", formData.deskripsi);

    try {
      const response = await axios.post("http://localhost:3000/api/users/artikel/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      console.log(response.data);
      navigate("/profile");
      // Handle success (e.g., show a success message, reset form, etc.)
    } catch (error) {
      console.error("Error submitting article:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <>
      <section className="page-tambah-artikel">
        <div className="card-row-tambah-artikel">
          <div className="card-tambah-artikel">
            <h3>Buat Artikel</h3>
            <br />
            <form id="form-tambah-artikel" onSubmit={handleSubmit}>
              <div className="input-group-tambah-artikel">
                <label htmlFor="judul">Judul Artikel:</label>
                <input type="text" id="judul" name="judul" required value={formData.judul} onChange={handleInputChange} />
              </div>
              <div className="input-group-tambah-artikel">
                <label htmlFor="gambar">Gambar Artikel:</label>
                <input type="file" id="gambar" name="gambar" accept="image/*" required onChange={handleImageChange} />
                {imagePreview && <img id="preview-gambar" className="preview-gambar" alt="Preview Gambar" src={imagePreview} style={{ display: "block", marginTop: "20px" }} />}
              </div>
              <div className="input-group-tambah-artikel">
                <label htmlFor="deskripsi">Deskripsi Artikel:</label>
                <textarea id="deskripsi" name="deskripsi" rows="10" required value={formData.deskripsi} onChange={handleInputChange}></textarea>
              </div>
              <div className="input-group-tambah-artikel">
                <button type="submit" className="btn-submit-tambah-artikel">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default BuatArtikel;
