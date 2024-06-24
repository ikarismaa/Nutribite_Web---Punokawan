import PropTypes from "prop-types";
import "./style.css";
import axios from "axios";
const BASE_URL = "http://localhost:3000";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const FilterButton = ({ text }) => {
  return <button className="filter">{text}</button>;
};

FilterButton.propTypes = {
  text: PropTypes.string.isRequired,
};

const RecipeCard = ({ id, image, title, description }) => {
  return (
    <div className="card-resep">
      <div className="content">
        <div className="image-container">
          <img src={`http://localhost:3000/${image}`} alt={title} />
        </div>
        <h4>{title}</h4>
        <p>{description}</p>
        <div className="rat">
          <div className="rating">
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
          </div>
          <Link to={`/api/recipes/${id}`}>
            <button>Masak</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const RecipeCategory = ({ recipes }) => {
  if (!recipes || recipes.length === 0) {
    return <p>No recipes available.</p>;
  }

  return (
    <div className="categories">
      <div className="card-bahan-container">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} id={recipe.id} image={recipe.img} title={recipe.recipe_title} description={recipe.deskripsi} />
        ))}
      </div>
    </div>
  );
};

RecipeCategory.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const ContainerCariBahan = () => {
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    const ingredients = searchParams.get("ingredients") ? searchParams.get("ingredients").split(",") : [];

    setSelectedIngredients(ingredients);

    const getDataMasakan = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/api/recipes/daftar/caribahan`, {
          bahan: ingredients,
        });
        setRecipes(response.data);
      } catch (err) {
        setError(err);
      }
    };

    getDataMasakan();
  }, [searchParams]);

  console.log(recipes);
  console.log(selectedIngredients);

  if (error) {
    return <p>Error loading recipes: {error.message}</p>;
  }

  return (
    <section className="resep-bahan">
      <h1>Resep Dari Bahan</h1>
      <div className="filters">
        {selectedIngredients.map((ingredient, index) => (
          <FilterButton key={index} text={ingredient} />
        ))}
      </div>
      <RecipeCategory recipes={recipes} />
    </section>
  );
};

export default ContainerCariBahan;
