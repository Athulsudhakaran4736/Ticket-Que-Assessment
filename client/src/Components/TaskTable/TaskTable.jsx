import { Dropdown, Menu, Pagination } from "antd";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import TaskUpdateModal from "../TaskUpdateModal/TaskUpdateModal";
import { onValue, ref, remove } from "firebase/database";
import { db } from "../../firebase/firebase";
import ReactLoading from 'react-loading';

export default function TaskTable() {
  const [data, setData] = useState([]);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [IsLoading, setIsLoading] = useState(true);
  const itemsPerPage = 6;

  const handleUpdate = (task) => {
    setUpdateVisible(true);
    setSelectedTask(task);
  };

  const handleUpdateCancel = () => {
    setSelectedTask(null);
  };

  const handleUpdateConfirm = (updatedTask) => {
    setSelectedTask(null);
  };

  const handleDelete = (data) => {
    remove(ref(db, `/${data.taskId}`));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        onValue(ref(db), (snapshot) => {
          setData([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((item) =>
              setData((oldArray) => [...oldArray, item]),
            );
            setIsLoading(false);
          }
        });
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="relative overflow-x-auto sm:rounded-lg mt-5 overflow-hidden">
      <table className="w-full ">
        <thead
          className=" text-sm uppercase font-extrabold border-b"
          style={{
            color: "#909CAF",
            backgroundColor: "#FAFAFB",
            borderColor: "#EDF2F7",
          }}
        >
          <tr>
            <th scope="col" className="px-5 py-7 font-semibold tracking-wider">
              Sl.No
            </th>
            <th scope="col" className="px-10 py-7 font-semibold tracking-wider">
              TaskName
            </th>
            <th scope="col" className="px-10 py-7 font-semibold tracking-wider">
              Created Date
            </th>
            <th scope="col" className="px-10 py-7 font-semibold tracking-wider">
              Priority
            </th>
            <th scope="col" className="px-10 py-7 font-semibold tracking-wider">
              Status
            </th>
            <th scope="col" className="px-10 py-7 font-semibold tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="w-full">
          {!IsLoading ? (
            currentItems.map((item, index) => (
              <tr key={index}>
                <td
                  className="px-6 py-4 border-b "
                  style={{ color: "#2B2B32", borderColor: "#EDF2F7" }}
                >
                  <div className="flex justify-center">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </div>
                </td>
                <td
                  className="px-6 py-4 border-b"
                  style={{ borderColor: "#EDF2F7" }}
                >
                  <div className="flex text-center items-center justify-center">
                    <div className="text-base" style={{ color: "#485A6C" }}>
                      {item.values.name}
                    </div>
                  </div>
                </td>
                <td
                  className="px-6 py-4 border-b"
                  style={{ borderColor: "#EDF2F7" }}
                >
                  <div className="flex text-center items-center justify-center">
                    <div className="text-base" style={{ color: "#485A6C" }}>
                      {item.values.currentDate}
                    </div>
                  </div>
                </td>
                <td
                  className="px-6 py-4 border-b text-center"
                  style={{ borderColor: "#EDF2F7" }}
                >
                  <div
                    className="font-medium text-base px-4 py-1 inline-block border-lg rounded-md w-24"
                    style={{
                      backgroundColor:
                        item.values.priority === "High"
                          ? "#B80000"
                          : item.values.priority === "Medium"
                          ? "#3876BF"
                          : "#EDF2F7",
                      color:
                        item.values.priority === "Low" ? "#505781" : "#fff",
                    }}
                  >
                    {item.values.priority}
                  </div>
                </td>
                <td
                  className="px-6 py-4 border-b text-center"
                  style={{ borderColor: "#EDF2F7" }}
                >
                  <div
                    className="font-medium text-base px-4 py-1  border-lg rounded-md inline-block w-32"
                    style={{
                      backgroundColor:
                        item.values.status === "In Progress"
                          ? "#1640D6"
                          : item.values.status === "Done"
                          ? "#5B9A8B"
                          : "#EDF2F7",
                      color: item.values.status === "Todo" ? "#505781" : "#fff",
                    }}
                  >
                    {item.values.status}
                  </div>
                </td>
                <td
                  className="px-6 py-4 border-b text-center"
                  style={{
                    borderColor: "#EDF2F7",
                    margin: "0 auto",
                  }}
                >
                  <div className="flex justify-center">
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item
                            key="update"
                            onClick={() => handleUpdate(item)}
                          >
                            Update
                          </Menu.Item>
                          <Menu.Item
                            key="delete"
                            onClick={() => handleDelete(item)}
                          >
                            Delete
                          </Menu.Item>
                        </Menu>
                      }
                      placement="bottom"
                      size="large"
                    >
                      <BsThreeDotsVertical
                        size={24}
                        style={{
                          cursor: "pointer",
                          textAlign: "center",
                        }}
                      />
                    </Dropdown>
                  </div>

                  <TaskUpdateModal
                    task={selectedTask}
                    visible={selectedTask !== null}
                    onCancel={handleUpdateCancel}
                    onUpdate={handleUpdateConfirm}
                    setUpdateVisible={setUpdateVisible}
                  />
                </td>
              </tr>
              
            ))
          ) : (
            <tr>
            <td
              className="text-center py-4"
              colSpan="6"
              style={{
                color: "#485A6C",
                fontStyle: "italic",
              }}
            >
              No Tasks Found....
            </td>
          </tr>
          )}
        </tbody>
      </table>
      <div className=" w-full flex justify-end mt-3">
        <Pagination
          defaultCurrent={1}
          total={data?.length}
          defaultPageSize={itemsPerPage}
          onChange={paginate}
        />
      </div>
    </div>
  );
}
