import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "./contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({ name, about: description });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="username"
        type="text"
        name="username"
        className="popup__text username"
        placeholder="Имя"
        required=""
        minLength={2}
        maxLength={40}
        value={name}
        onChange={handleNameChange}
      />
      <span className="username-error error" />
      <input
        id="job"
        type="text"
        name="about"
        className="popup__text about"
        placeholder="О себе"
        required=""
        minLength={2}
        maxLength={200}
        value={description}
        onChange={handleDescriptionChange}
      />
      <span className="about-error error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
