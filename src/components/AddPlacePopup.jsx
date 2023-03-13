import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [title, setTitle] = useState();
  const [link, setLink] = useState();

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ name: title, link });
    setLink("");
    setTitle("");
  }

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="card-title"
        type="text"
        name="name"
        className="popup__text"
        placeholder="Название"
        required=""
        minLength={2}
        maxLength={30}
        value={title}
        onChange={handleTitleChange}
      />
      <span className="name-error error" />
      <input
        id="card-link"
        type="url"
        name="link"
        className="popup__text"
        placeholder="Ссылка на картинку"
        required=""
        value={link}
        onChange={handleLinkChange}
      />
      <span className="link-error error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
