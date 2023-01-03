import { useEffect, useState } from "react";
import "./style.scss";
import { Modal } from "reactstrap";
import _ from "lodash";

const ModalUpdateNews = (props) => {
  const [content, setContent] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [title, setTitle] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const updateNew = { title, content, shortDescription, categoryCode };

  const toggle = () => {
    props.toggleModalsUpdate();
  };

  useEffect(() => {
    let news = props.currentNews;
    if (news && !_.isEmpty(news)) {
      setTitle(news.title);
      setContent(news.content);
      setShortDescription(news.shortDescription);
      setCategoryCode(news.categoryCode);
    }
  });

  const handleSaveChangesNews = () => {
    props.updateNews(updateNew);
    console.log(updateNew);
  };

  return (
    <>
      <div className="form-update-container">
        <Modal isOpen={props.isOpenModalsUpdate} toggle={toggle}>
          <div className="form-update">
            <div className="close" onClick={toggle}>
              x
            </div>
            <div className="form-update-header">
              <p className="form-title">Update News</p>
            </div>
            <div className="form-update-body">
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
                  name="content"
                  className="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
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
            </div>
            <div className="form-update-footer">
              <div className="btn">
                <button
                  className="btn-save"
                  onClick={() => handleSaveChangesNews()}
                >
                  Save change
                </button>
                <button className="btn-closes" onClick={toggle}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ModalUpdateNews;
