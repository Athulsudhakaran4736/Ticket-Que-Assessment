import React, { useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { ref, update } from "firebase/database";
import { db } from "../../firebase/firebase";
import { toast } from "react-hot-toast";

const { Option } = Select;

const TaskUpdateModal = ({ task, visible, onCancel, onUpdate }) => {
  const [name, setName] = useState(task?.values.name);
  const [priority, setPriority] = useState(task?.values.priority);
  const [status, setStatus] = useState(task?.values.status);
  const currentDate = task?.values.currentDate;

  let tempUid = task?.taskId;

  const onFinish = async (values) => {
    const {name, priority, status} = values;
    if(!name || !priority || !status){
        toast.error("Please fill all the fields");
        return
    }
    try {
      onUpdate(values);
      await update(ref(db, `/${tempUid}`), {
        values,
        tempUid,
      });
      toast.success("Task updated successfully")
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Task is not updated")
    }
  };
  return (
    <Modal
      title="Update Task"
      visible={visible}
      onCancel={onCancel}
      style={{ marginTop: "200px" }}
      maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          onClick={() => onFinish({ name, priority, status, currentDate })}
        >
          Update
        </Button>,
      ]}
    >
      <Form name="updateTask" layout="vertical">
        <Form.Item name="taskName" label="Task Name" >
          <Input
            defaultValue={task ? name : ""}
            onChange={(e) => setName(e.target.value)}
            allowClear
          />
        </Form.Item>
        <Form.Item name="priority" label="Priority" required>
          <Select
            defaultValue={priority}
            onChange={(value) => setPriority(value)}
          >
            <Option value="High">High</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Low">Low</Option>
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Status" required>
          <Select defaultValue={status} onChange={(value) => setStatus(value)}>
            <Option value="Todo">To Do</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Done">Done</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskUpdateModal;
