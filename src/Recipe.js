import React from "react";
import style from "./recipe.module.css";

//부모 state를 받아서 => props로 받는다!!
//flowing down the information
const Recipe = ({ title, calories, image, ingredients }) => {
  return (
    <div className={style.recipe}>
      <h1>{title}</h1>
      <ul>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ul>
      <p>{calories}</p>
      <img src={image} alt="" />
    </div>
  );
};

export default Recipe;
