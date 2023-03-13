import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPropfile(props) {
  const avatarInput = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarInput.current.value);
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-link"
        type="url"
        name="link"
        className="popup__text"
        placeholder="Ссылка на картинку"
        required=""
        ref={avatarInput}
      />
      <span className="link-error error" />
    </PopupWithForm>
  );
}

export default EditAvatarPropfile;
