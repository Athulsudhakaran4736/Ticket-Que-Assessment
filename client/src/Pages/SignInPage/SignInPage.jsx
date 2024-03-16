import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doSignInUserWithEmailAndPassword } from "../../firebase/auth";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { toast } from "react-hot-toast";
import "./SigninPage.css"

export const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!isSigningIn) {
        setIsSigningIn(true);
        await doSignInUserWithEmailAndPassword(email, password);
        navigate("/home");
        window.location.reload();
      }
    } catch (error) {
      toast.error("User credentials are wrong");
      setPassword("");
      setEmail("");
      setIsSigningIn(false);
    }
  };
  return (
    <div
      className="flex justify-center items-center signin-container"
      style={{ height: "100vh" }}
    >
      <div
        className="p-20 max-w-lg mx-auto border rounded-xl"
        style={{ width: "100%" }}
      >
        <h2 className="text-xl font-bold text-center pb-12 mx-auto">Sign In</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label className=" font-semibold text-md">Email</label>
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-slate-100 rounded-lg p-2"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            allowClear
          />
          <label className=" font-semibold text-md">Password</label>
          <Input.Password
            type="password"
            placeholder="Enter your password"
            className="bg-slate-100 rounded-lg p-2"
            id="password"
            value={password}
            required
            allowClear
            onChange={(e) => setPassword(e.target.value)}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <button
            size="large"
            className="bg-slate-600 text-white p-2 rounded-lg uppercase font-semibold hover:opacity-95 disabled:opacity-70 mt-5"
            type="submit"
          >
            Sign In
          </button>
          <div className="flex gap-2 account-wrapper">
            <p>Dont have an account?</p>
            <Link to="/">
              <span className="text-blue-600 text-sm font-medium">Sign Up</span>
            </Link>
          </div>
        </form>
      </div>
      {/* </Card> */}
    </div>
  );
};
