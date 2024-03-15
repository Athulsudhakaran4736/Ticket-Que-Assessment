import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { Input } from "antd";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.length < 5) {
      setErrorMessage("Name should be atleast 5 character long");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }
    const passwordRegex =
      /^(?=.*[a-zA-Z\d])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password should be at least 8 characters long and include numbers, letters, and symbols.",
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }
    if (!isSignUp) {
      setIsSignUp(true);
      await doCreateUserWithEmailAndPassword(name, email, password);
      navigate("/sign-in");
    }
  };
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "100vh" }}
    >
      <div
        className="p-20 max-w-lg mx-auto border rounded-xl"
        style={{ width: "100%" }}
      >
        <h2 className="text-xl font-bold text-center py-9 mx-auto">Sign Up</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter your name"
            className="bg-slate-100 rounded-lg p-2 mb-3"
            id="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            allowClear
          />
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-slate-100 rounded-lg p-2 mb-3"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            allowClear
          />
          <Input.Password
            type="password"
            placeholder="Enter your password"
            className="bg-slate-100 rounded-lg p-2 mb-3"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            allowClear
            required
          />
          <button
            size="large"
            type="submit"
            className="bg-slate-600 text-white p-2 rounded-lg uppercase font-semibold hover:opacity-95 disabled:opacity-70 "
          >
            Sign Up
          </button>
          <p className="text-red-600">{errorMessage ? errorMessage : ""}</p>
          <div className="flex gap-2">
            <p>Have an account?</p>
            <Link to="/sign-in">
              <span className="text-blue-600 text-sm font-medium">Sign In</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
