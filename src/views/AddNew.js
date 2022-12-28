import "./style.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalAddNews from "./ModalAddNews";
import { emitter } from "../utils/emitter";

const AddNew = () => {
  const [allNew, setAllNew] = useState([]);
  const [content, setContent] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [title, setTitle] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const [isOpenModalAddNew, setIsOpenModalAddNew] = useState(false);

  const handleCreateNews = () => {
    try {
      const addNew = { title, content, shortDescription, categoryCode };
      axios.post("http://localhost:8083/news", addNew).then((res) => {
        console.log(res.data);
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      axios.get("http://localhost:8083/news").then((res) => {
        setAllNew(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleToggleModal = () => {
    setIsOpenModalAddNew(!isOpenModalAddNew);
  };

  return (
    <>
      <div className="user-container">
        <ModalAddNews
          toggleModals={handleToggleModal}
          isOpenModals={isOpenModalAddNew}
          createNews={handleCreateNews}
        />
        <div className="user-title text-center">New manage with Pham Phat</div>
        <div className="text-center">
          <button className="btn-add-new" onClick={() => handleToggleModal()}>
            + Add news
          </button>
        </div>
        <div className="user-table">
          <table id="customers">
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>ShortDescription</th>
              <th>Action</th>
            </tr>
            {allNew.map((item, index) => {
              return (
                <>
                  <tbody>
                    <tr key={item.id}>
                      <th> {item.title} </th>
                      <th> {item.content} </th>
                      <th> {item.shortDescription} </th>
                      <th>
                        {" "}
                        <button>Edit</button>
                        <button>Delete</button>
                      </th>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};

export default AddNew;
