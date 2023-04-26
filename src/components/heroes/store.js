import React from "react";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./store.css";

const Store = () => {
  const [hero, setHero] = useState({
    name: "",
    description: "",
    offensive: "",
    defensive: "",
    utility: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const userInput = (e) => {
    setHero({ ...hero, [e.target.name]: e.target.value });
  };

  const store = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", hero.name);
    formData.append("description", hero.description);
    formData.append("offensive", hero.offensive);
    formData.append("defensive", hero.defensive);
    formData.append("utility", hero.utility);
    formData.append("image", imageFile);

    axios({
      method: "POST",
      headers: {
        Authorization: Cookies.get("token"),
        "Content-Type": "multipart/form-data",
      },
      url: "http://mobilelegendheroes.test/api/v1/heroes",
      data: formData,
    })
      .then((response) => {
        console.log("store hero", response.data);
      })
      .catch((error) => console.log("error fetch", error));
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4">Create Hero</h1>
      <form onSubmit={store} method="post">
        <label htmlFor="name">Hero Name</label>
        <br />
        <input
          type="text"
          name="name"
          id="name"
          value={hero.name}
          onChange={userInput}
          placeholder="Input a Hero Name"
        />

        <br />

        <label htmlFor="description">Hero Description</label>
        <br />
        <input
          type="text"
          name="description"
          id="description"
          value={hero.description}
          onChange={userInput}
          placeholder="Input a Hero Description"
        />

        <br />

        <label htmlFor="stats">Hero Stats</label>
        <br />

        <input
          min={0}
          max={1000}
          placeholder="input offensive"
          type="number"
          name="offensive"
          id="offensive"
          onChange={userInput}
        />
        <input
          min={0}
          max={1000}
          placeholder="input defensive"
          type="number"
          name="defensive"
          id="defensive"
          onChange={userInput}
        />
        <input
          min={0}
          max={1000}
          placeholder="input utility"
          type="number"
          name="utility"
          id="utility"
          onChange={userInput}
        />

        <br />

        <label htmlFor="image">Image</label>
        <br />
        <input type="file" name="image" id="image" onChange={userInput} />

        <button type="submit" className="btn btn-primary container">
          Next
        </button>
      </form>
    </div>
  );
};

export default Store;
