import { useState, useEffect } from "react";
import "./style.css";
import gambarSawi from "/src/assets/sawi.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

const ListBahan = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState({});

  useEffect(() => {
    const getIngredients = () => {
      axios
        .get(`${BASE_URL}/api/recipes/daftar/bahan`)
        .then((response) => {
          console.log("Response:", response.data);
          setIngredients(response.data.data);
          setFilteredIngredients(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching ingredients:", error);
        });
    };

    getIngredients();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filteredData = ingredients.filter((x) => x.ingredient_name.toLowerCase().includes(event.target.value.toLowerCase()));
    setFilteredIngredients(filteredData);
  };

  const handleSearch = () => {
    if (ingredients) {
      console.log("Selected Ingredients:", selectedIngredients);

      let selected = [];
      for (let ingredientId in selectedIngredients) {
        if (selectedIngredients[ingredientId]) {
          const ingredient = ingredients.find((x) => x.id_ingredients == ingredientId);
          if (ingredient) selected.push(ingredient.ingredient_name);
        }
      }

      console.log("Selected:", selected);
      navigate(`/caribahan?ingredients=${selected}`);
    }
  };

  function handleCheckboxChangeWithLimit(id, limit) {
    // Update the state with the new checkbox selection
    setSelectedIngredients({
      ...selectedIngredients,
      [id]: !selectedIngredients[id],
    });

    // Get the current number of checked checkboxes
    const checkedCount = Object.values(selectedIngredients).filter(Boolean).length;

    // Check if the limit has been exceeded
    if (checkedCount >= limit) {
      // Uncheck the most recently clicked checkbox
      setSelectedIngredients({
        ...selectedIngredients,
        [id]: false,
      });
      alert(`You can only select a maximum of ${limit} ingredients.`);
    }
  }

  return (
    <section className="bahan">
      <h1>Bahan</h1>
      <div className="container-bahan">
        <div className="left-bahan">
          <input type="text" placeholder="Cari..." value={searchTerm} onChange={handleSearchChange} />
          {filteredIngredients.map((x) => (
            <div key={x.id_ingredients} className="ingredient">
              <img src={x.img ? `${BASE_URL}/${x.img}` : gambarSawi} alt={x.ingredient_name} />
              {x.ingredient_name}
              <label>
                <input type="checkbox" checked={selectedIngredients[x.id_ingredients] || false} onChange={() => handleCheckboxChangeWithLimit(x.id_ingredients, 2)} />
              </label>
            </div>
          ))}
        </div>
        <div className="right-bahan">
          <div className="selected-ingredients">
            <h2>Bahan Yang Dibutuhkan</h2>
            <p>Max 2 Bahan</p>
            {Object.entries(selectedIngredients).map(
              ([ingredientId, selected]) =>
                selected && (
                  <div key={ingredientId} className="ingredient">
                    <img
                      src={ingredients.find((obj) => obj.id_ingredients == ingredientId)?.img ? `${BASE_URL}/${ingredients.find((obj) => obj.id_ingredients == ingredientId)?.img}` : gambarSawi}
                      alt={ingredients.find((obj) => obj.id_ingredients == ingredientId)?.ingredient_name}
                    />
                    <label>{ingredients.find((obj) => obj.id_ingredients == ingredientId)?.ingredient_name}</label>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
      <div className="buttons-bahan">
        <button className="total-bahan">Total: {Object.values(selectedIngredients).filter((selected) => selected).length}</button>
        <button className="cari-bahan" onClick={handleSearch}>
          Cari
        </button>
      </div>
    </section>
  );
};

export default ListBahan;
