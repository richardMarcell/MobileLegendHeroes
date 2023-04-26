import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./show.css";

const Show = () => {
  const [hero, setHero] = useState({});
  const { id } = useParams();

  useEffect(() => {
    let url = `http://mobilelegendheroes.test/api/v1/heroes/${id}`;
    axios
      .get(url, {
        headers: {
          Authorization: Cookies.get("token"),
        },
      })
      .then((Response) => {
        setHero(Response.data.data);
        console.log("heroes.show", Response.data);
      })
      .catch((error) => console.log("error fetch", error));
  }, [id]);

  return (
    <div>
      <a href="/heroes" className="btn btn-primary">
        Back
      </a>
      <div className="heroImage">
        <img src={hero.image} alt={hero.name} />
        <h3>{hero.name}</h3>
        <p>{hero.description}</p>
      </div>

      <div className="status">
        <table>
          <thead>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
          </thead>
          <tbody>
            {hero.skills &&
              hero.skills.map((skill) => (
                <tr key={skill.id}>
                  <td>{skill.name}</td>
                  <td>{skill.description}</td>
                  <td>{skill.category}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="skill"></div>
    </div>
  );
};

export default Show;
