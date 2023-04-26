import React from "react";
import axios from "axios";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const Login = () => {
  // state untuk menyimpan data inputan user
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // state untuk menyimpan hasil login post dari API
  const [userData, setUserData] = useState([]);

  // membuat variabel untuk melakukan route ke halama tertentu
  const route = useNavigate();

  // fungsi untuk menyimpan inputan user ke dalam state user
  const userInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // membuat fungsi login dengan mengambil data dari API
  const authenticate = (e) => {
    e.preventDefault();

    let url = "http://mobilelegendheroes.test/api/login";

    let formData = new FormData();

    formData.append("email", user.email);
    formData.append("password", user.password);

    axios
      .post(url, formData)
      .then((Response) => {
        setUserData(Response.date);
        route("/heroes", {
          state: [Response.data],
        });
        Cookies.set("token", "Bearer" + " " + Response.data.token);
        Cookies.set("user_id", Response.data.user.id);

        console.log("user data", Response.data);
      })
      .catch((error) => console.log("error login", error));
  };

  return (
    <>
      <h1 className="text-center">Login</h1>

      <form method="POST" className="mx-5" autoComplete="off" onSubmit={authenticate}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          autoComplete="off"
          onChange={userInput}
          name="email"
          className="container"
          id="email"
          placeholder="Input your email"
          value={user.email}
        />
        <br />
        <label htmlFor="password">Password</label> <br />
        <input
          type="password"
          autoComplete="off"
          onChange={userInput}
          name="password"
          id="password"
          className="container"
          placeholder="Input your Password"
          value={user.password}
        />
        <br />
        <br />
        <button type="submit" className="container btn btn-primary">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
