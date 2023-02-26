import "../index.css";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard("");
    console.log("ok");
  }

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    if (isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddPlacePopupOpen || isImagePopupOpen) {
      document.addEventListener("keydown", handleEscClose);

      return () => {
        document.removeEventListener("keydown", handleEscClose);
      };
    }
  }, [isEditProfilePopupOpen, isEditAvatarPopupOpen, isAddPlacePopupOpen, isImagePopupOpen]);

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  return (
    <>
      <Header />
      <Main
        onCardClick={handleCardClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />
      <Footer />

      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
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
        />
        <span className="about-error error" />
      </PopupWithForm>

      <PopupWithForm name="add-place" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input
          id="card-title"
          type="text"
          name="name"
          className="popup__text"
          placeholder="Название"
          required=""
          minLength={2}
          maxLength={30}
        />
        <span className="name-error error" />
        <input
          id="card-link"
          type="url"
          name="link"
          className="popup__text"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span className="link-error error" />
      </PopupWithForm>

      <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input
          id="avatar-link"
          type="url"
          name="link"
          className="popup__text"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span className="link-error error" />
      </PopupWithForm>

      <PopupWithForm name="delete-card" title="Вы уверены?" onClose={closeAllPopups} />
      <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard} />
    </>
  );
}

export default App;
