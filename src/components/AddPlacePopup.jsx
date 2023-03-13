import PopupWithForm from "./PopupWithForm";
import useValidation from "../utils/useValidation";

function AddPlacePopup(props) {
  const { values, errors, handleChange, defaultValues } = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(values);
    defaultValues({ name: "", link: "" });
  }

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      textBtn={props.textBtn}
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
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="name-error error">{errors.name || ""}</span>
      <input
        id="card-link"
        type="url"
        name="link"
        className="popup__text"
        placeholder="Ссылка на картинку"
        required=""
        value={values.link || ""}
        onChange={handleChange}
      />
      <span className="link-error error">{errors.link || ""}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
