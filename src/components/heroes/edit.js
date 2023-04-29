import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Update = () => {
  const location = useLocation();
  const route = useNavigate();

  const dataState = location.state;

  const [hero, setHero] = useState({
    name: dataState.name,
    description: dataState.description,
    stats: {
      offensive: dataState.stats.offensive,
      defensive: dataState.stats.defensive,
      utility: dataState.stats.utility,
    },
    image: dataState.image,
  });

  const userInput = (e) => {
    setHero({ ...hero, [e.target.name]: e.target.value });
  };

  console.log("hero", hero);

  const imageUpload = (e) => {
    setHero({ ...hero, image: e.target.files[0] });
  };

  console.log("token", Cookies.get("token"));

  const update = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", hero.name);
    formData.append("description", hero.description);
    formData.append("offensive", hero.stats.offensive);
    formData.append("defensive", hero.stats.defensive);
    formData.append("utility", hero.stats.utility);
    formData.append("image", hero.image);

    axios
      .post(
        `http://mobilelegendheroes.test/api/v1/heroes/${dataState.id}`,
        formData,
        {
          headers: {
            Authorization: Cookies.get("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("update hero", response.data);
        route("/heroes");
      })
      .catch((error) => console.log("error fetch", error));
  };

  return (
    <div>
      <a href="/heroes" className="btn btn-primary">
        Back
      </a>
      <h1 className="text-center">Edit Hero</h1>
      <form onSubmit={update} method="post" encType="multipart/form-data">
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
          value={hero.stats.offensive}
        />
        <input
          min={0}
          max={1000}
          placeholder="input defensive"
          type="number"
          name="defensive"
          id="defensive"
          onChange={userInput}
          value={hero.stats.defensive}
        />
        <input
          min={0}
          max={1000}
          placeholder="input utility"
          type="number"
          name="utility"
          id="utility"
          onChange={userInput}
          value={hero.stats.utility}
        />

        <br />

        <label htmlFor="image">Image</label>
        <br />
        <img
          src={`http://mobilelegendheroes.test/${hero.image}`}
          alt={hero.name}
        />
        <input type="file" name="image" id="image" onChange={imageUpload} />

        <button type="submit" className="btn btn-primary container">
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
