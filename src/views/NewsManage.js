import "./style.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalUpdateNews from "./ModalUpdateNews";

const NewsManage = () => {
  const [allNew, setAllNew] = useState([]);
  const [id, setID] = useState(null);
  const [content, setContent] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [title, setTitle] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const [isOpenModalAddNew, setIsOpenModalAddNew] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const initState = {
    id,
    title,
    content,
    shortDescription,
    categoryCode,
  };
  const [newsUpdate, setNewsUpdate] = useState(initState);

  const clearData = () => {
    setTitle("");
    setContent("");
    setCategoryCode("");
    setShortDescription("");
  };

  const handleCreateNews = () => {
    try {
      const addNew = { title, content, shortDescription, categoryCode };
      axios.post("http://localhost:8081/news", addNew).then((res) => {
        console.log(res.data);
        clearData();
        getAllNewsFromReact();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllNewsFromReact = () => {
    axios.get("http://localhost:8081/news").then((res) => {
      setAllNew(res.data);
    });
  };

  useEffect(() => {
    try {
      getAllNewsFromReact();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDeleteNews = (id) => {
    axios.delete(`http://localhost:8081/news/${id}`);
    getAllNewsFromReact();
  };

  const handleUpdateNews = async (id, data) => {
    await axios.put(`http://localhost:8081/news/${id}`, data).then((res) => {
      console.log(res.data);
      getAllNewsFromReact();
    });
  };

  // const handleToggleModal = () => {
  //   setIsOpenModalAddNew(!isOpenModalAddNew);
  // };

  const handleToggleUpdate = () => {
    setIsOpenModalUpdate(!isOpenModalUpdate);
  };

  const handleUpdateModals = (news) => {
    setIsOpenModalUpdate(true);
    setNewsUpdate(news);
    console.log("Check data:", news);
  };

  return (
    <>
      <div className="user-container">
        {/* <ModalAddNews
          toggleModals={handleToggleModal}
          isOpenModals={isOpenModalAddNew}
          createNews={handleCreateNews}
        /> */}
        <ModalUpdateNews
          toggleModalsUpdate={handleToggleUpdate}
          isOpenModalsUpdate={isOpenModalUpdate}
          updateNews={handleUpdateNews}
          currentNews={newsUpdate}
        />
        <div className="user-title text-center">New manage with Pham Phat</div>
        <div className="text-center">
          <button className="btn-add-new">+ Add news</button>
        </div>
        <div className="user-table">
          <table id="customers">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Content</th>
              <th>ShortDescription</th>
              <th>Action</th>
            </tr>
            {allNew.map((item, index) => {
              return (
                <>
                  <tbody>
                    <tr key={index}>
                      <th> {item.id} </th>
                      <th> {item.title} </th>
                      <th> {item.content} </th>
                      <th> {item.shortDescription} </th>
                      <th>
                        {" "}
                        <button
                          type="button"
                          onClick={() => handleUpdateModals()}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteNews(item.id)}
                        >
                          Delete
                        </button>
                      </th>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </table>
        </div>
      </div>
      <div className="form-post">
        <div className="input-title">
          <div>
            <label>Title</label>
          </div>
          <input
            type="text"
            name="title"
            className="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-content">
          <div>
            <label>Content</label>
          </div>
          <textarea
            type="text"
            maxLength={200}
            name="content"
            className="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="input-short">
          <div>
            <label>ShortDescription</label>
          </div>
          <input
            type="text"
            name="shortDescription"
            className="shortDescription"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </div>
        <div className="input-category">
          <div>
            <label>CategoryCode</label>
          </div>
          <input
            type="text"
            name="category"
            className="category"
            value={categoryCode}
            onChange={(e) => setCategoryCode(e.target.value)}
          />
        </div>
        <button type="submit" onClick={() => handleCreateNews()}>
          Add new
        </button>
      </div>
    </>
  );
};

export default NewsManage;
