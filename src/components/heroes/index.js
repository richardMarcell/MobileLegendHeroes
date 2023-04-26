import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [heroes, setHeroes] = useState([]);

  const mobilelegendheroes = () => {
    let url = "http://mobilelegendheroes.test/api/v1/heroes";
    axios
      .get(url, {
        headers: {
          Authorization: Cookies.get("token"),
        },
      })
      .then((Response) => {
        setHeroes(Response.data);
        console.log("heroes.index", Response.data);
      })
      .catch((error) => console.log("error fetch", error));
  };

  const destroy = (id) => {
    axios
      .delete(`http://mobilelegendheroes.test/api/v1/heroes/${id}`, {
        headers: {
          Authorization: Cookies.get("token"),
        },
      })
      .then((Response) => {
        console.log(Response);
      })
      .catch((error) => {
        console.log("error delete", error);
      });
  };

  let navigate = useNavigate();

  const show = (id) => {
    navigate(`/heroes/${id}`);
  };

  const [searchHero, setSearchHero] = useState("");

  const searchHeroes = (heroes) => {
    return heroes.filter((hero) =>
      hero.name.toLowerCase().includes(searchHero.toLowerCase())
    );
  };

  useEffect(() => {
    mobilelegendheroes();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-4">Hero List</h1>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search a hero"
        value={searchHero}
        onChange={(event) => setSearchHero(event.target.value)}
      />
      <a href="/heroes/create" className="btn btn-primary" id="tombol">
        Add Hero
      </a>
      <table>
        <thead>
          <th>Name</th>
          <th>Description</th>
          <th>Image</th>
          <th>Show</th>
          <th>Edit</th>
          <th>Delete</th>
        </thead>
        <tbody>
          {searchHeroes(heroes.data || []).map((hero) => (
            <tr key={hero.id}>
              <td>{hero.name}</td>
              <td>{hero.description}</td>
              <td>
                <img src={hero.image} alt="gambar hero" />
              </td>
              <td>
                <button
                  onClick={() => show(hero.id)}
                  className="btn btn-primary"
                >
                  Show
                </button>
              </td>
              <td>
                <button className="btn btn-success">Edit</button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => destroy(hero.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
