import React from "react";
import { Avatar, Button, Card, Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";

export const ProfilePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/home");
  };
  return (
    <>
      <Header />
      <div
        className="flex justify-center items-center"
        style={{ height: "100vh" }}
      >
        <div
          className="p-10 max-w-lg mx-auto border border-gray-300 rounded-xl"
          style={{ width: "100%" }}
        >
          <h3 className="font-semibold">My Profile</h3>
          <div className="flex justify-center m-4 flex-col items-center">
            <Avatar size={64} icon={<UserOutlined />} />
            <h2 className="font-bold text-xl mt-2">
              {currentUser?.displayName ? currentUser?.displayName : "No Name"}
            </h2>
            <Form className="mt-4" layout="vertical" style={{ width: "100%" }}>
              <Form.Item label="Email">
                <Input disabled defaultValue={currentUser?.email} />
              </Form.Item>
              <Form.Item label="Phone Number">
                <Input disabled placeholder="123456789" />
              </Form.Item>
            </Form>
            <Button size="large" className=" bg-slate-300 " onClick={onSubmit}>
              OK
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
