import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

//useEffect 이용해서 검색어 바뀔 때 자동으로 검색결과 바뀌도록.
const App = () => {
  const APP_ID = "38317aac";
  const APP_KEY = "a80303c6a3a318a87560b648a0c324c6";
  const [recipes, setRecipes] = useState([]); //레서피 담을 빈 배열
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  useEffect(() => {
    getRecipes(); //api fetch해서 데이터 받아오는 함수
  }, [query]); //첫 마운트 될 때만 실행해!(api를 렌더될때마다 부르는건 좋지 않으므로)
  //search 바뀔 때마다 fetch api!

  //async로 fetch 데이터 받아올 때까지 기다려서
  //그 응답을 json으로 변환
  const getRecipes = async () => {
    //response : api주소에서 받은 것
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json(); //언제 응답 받을지 모르니 await 꼭 넣기
    //레서피 담을 빈 배열에 api 받아온 데이터의 hits key를 집어 넣는다.
    setRecipes(data.hits); //hits: json 데이터에서 레서피 담긴 key
  };
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };
  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input
          type="text"
          className="search-bar"
          value={search}
          onChange={updateSearch}
        />
        <button type="submit" className="search-button">
          Submit
        </button>
      </form>
      {recipes.map((item) => (
        <Recipe
          title={item.recipe.label}
          calories={item.recipe.calories}
          image={item.recipe.image}
          ingredients={item.recipe.ingredients}
        />
      ))}
    </div>
  );
};
export default App;
