import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Index = () => {
  const [heroes, setHeroes] = useState([]);
  const [searchHero, setSearchHero] = useState("");
  const navigate = useNavigate();

  const mobilelegendheroes = () => {
    let url = "http://mobilelegendheroes.test/api/v1/heroes";
    axios
      .get(url, {
        headers: {
          Authorization: Cookies.get("token"),
        },
      })
      .then((response) => {
        setHeroes(response.data);
        console.log("heroes.index", response.data);
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
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("error delete", error);
      });
  };

  const edit = (hero) => {
    navigate(`/heroes/${hero.id}/edit`, { state: hero });
  };

  const show = (id) => {
    navigate(`/heroes/${id}`);
  };

  const searchHeroes = (heroes) => {
    return heroes.filter((hero) =>
      hero.name.toLowerCase().includes(searchHero.toLowerCase())
    );
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user_id");
    navigate("/");
  };

  useEffect(() => {
    mobilelegendheroes();
  }, []);

  return (
    <div className="container">
      <button className="btn btn-danger" onClick={logout}>
        Log Out
      </button>
      <h1 className="text-center mt-4">Hero List</h1>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search a hero"
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
                <img
                  src={`http://mobilelegendheroes.test/${hero.image}`}
                  alt={"hero " + hero.name}
                />
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
                <button onClick={() => edit(hero)} className="btn btn-success">
                  Edit
                </button>
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
