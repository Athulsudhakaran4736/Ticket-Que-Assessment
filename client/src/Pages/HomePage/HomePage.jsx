import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import { useAuth } from "../../contexts/authContext";
import TaskTable from "../../Components/TaskTable/TaskTable";
import { Button, Modal, Form, Input, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../firebase/firebase";
import { ref, set } from "firebase/database";
import { Option } from "antd/es/mentions";
import { toast } from "react-hot-toast";

export const HomePage = () => {
  const { isLoggedIn } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [searchTasks, setSearchTasks] = useState("");

  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  //   console.log(tasks,"tasks")

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const onFinish = async (values) => {
    const { name, priority, status } = values;

    if (!name || !priority || !status) {
      toast.error("Please fill in all the fields");
      return;
    }
    try {
      const taskId = uuidv4();
      await set(ref(db, `/${taskId}`), {
        values,
        taskId,
      }); 
      toast.success("Task created successfully!!!")
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Task is not created")
    }
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center  m-10">
        <div className="border border-gray-300 rounded-lg w-full flex flex-col min-h-0 p-5">
          <div className="flex justify-between">
            <div className="font-semibold text-xl">Tasks</div>
            <div className="flex gap-3">
              <div>
              <Button onClick={showModal} size="large">
                Create Task
              </Button>
              </div>
              <div>
                <Input size="large" placeholder="Search Tasks" onChange={(e) => setSearchTasks(e.target.value)} allowClear/>
              </div>
              <Modal
                title="Create Task"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ marginTop: "200px" }}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button
                    key="submit"
                    onClick={() =>
                      onFinish({ name, priority, status, currentDate })
                    }
                  >
                    Submit
                  </Button>,
                ]}
              >
                <Form
                  name="createTask"
                  onFinish={onFinish}
                  layout="vertical"
                  className="mt-5"
                >
                  <Form.Item name="taskName" label="Task Name" required="true">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      allowClear
                    />
                  </Form.Item>
                  <Form.Item name="priority" label="Priority" required="true">
                    <Select
                      value={priority}
                      onChange={(value) => setPriority(value)}
                    >
                      <Option value="High">High</Option>
                      <Option value="Medium">Medium</Option>
                      <Option value="Low">Low</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="status" label="Status" required="true">
                    <Select
                      value={status}
                      onChange={(value) => setStatus(value)}
                    >
                      <Option value="Todo">To Do</Option>
                      <Option value="In Progress">In Progress</Option>
                      <Option value="Done">Done</Option>
                    </Select>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
          <TaskTable
            searchTasks={searchTasks}
          />
        </div>
      </div>
    </div>
  );
};
