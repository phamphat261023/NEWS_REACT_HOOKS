import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../utils/emitter";

const ModalAddNews = (props) => {
  const [content, setContent] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [title, setTitle] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const addNew = { title, content, shortDescription, categoryCode };

  const toggle = () => {
    props.toggleModals();
  };

  const listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      setTitle("");
      setContent("");
      setCategoryCode("");
      setShortDescription("");
    });
  };

  const checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["title", "content", "shortDescription", "categoryCode"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!addNew[arrInput[i]]) {
        isValid = false;
        alert("Mising parameter " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  const handleAddNews = () => {
    let isCheck = checkValidateInput();
    if (isCheck === true) {
      props.createNews(addNew);
      listenToEmitter();
    }
  };

  return (
    <>
      <div className="modals-container">
        <Modal isOpen={props.isOpenModals} toggle={toggle}>
          <div className="close" onClick={toggle}>
            x
          </div>
          <ModalHeader toggle={toggle}>Add new infomation</ModalHeader>
          <ModalBody>
            <div className="modals-form">
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
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => handleAddNews()}>
              Add new
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default ModalAddNews;
