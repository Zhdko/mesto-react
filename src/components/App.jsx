import "../index.css";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import React, { useState, useEffect } from "react";
import api from "../utils/Api";
import CurrentUserContext from "./contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirm from "./PopupWithConfirm";
import PopupWithError from "./PopupWithError";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        setIsErrorPopupOpen(true);
        setError({ title: err, text: "Ошибка получения данных с сервера" });
      });
  }, []);

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    if (
      isEditProfilePopupOpen ||
      isEditAvatarPopupOpen ||
      isAddPlacePopupOpen ||
      isDeleteCardPopupOpen ||
      isImagePopupOpen
    ) {
      document.addEventListener("keydown", handleEscClose);

      return () => {
        document.removeEventListener("keydown", handleEscClose);
      };
    }
  }, [isEditProfilePopupOpen, isEditAvatarPopupOpen, isAddPlacePopupOpen, isImagePopupOpen, isDeleteCardPopupOpen]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleDeleteCardButtonClick(card) {
    setSelectedCard(card);
    setIsDeleteCardPopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsErrorPopupOpen(false);
    setTimeout(() => setSelectedCard(null), 300);
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true);
    api
      .setUserInfo(userInfo)
      .then((res) => setCurentUser(res))
      .catch((err) => {
        setIsErrorPopupOpen(true);
        setError({ title: err, text: "Увы, что-то пошло не по плану" });
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .editAvatar(avatar)
      .then((res) => setCurentUser(res))
      .catch((err) => {
        setIsErrorPopupOpen(true);
        setError({ title: err, text: "Увы, что-то пошло не по плану" });
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleAddPlace(newCard) {
    setIsLoading(true);
    api
      .addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        setIsErrorPopupOpen(true);
        setError({ title: err, text: "Не смогли добавить новую карточку :(" });
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        setIsErrorPopupOpen(true);
        setError({ title: err, text: "Вы старались" });
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((item) => item._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        setIsErrorPopupOpen(true);
        setError({ title: err, text: "Может оно и к лучшему?" });
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  return (
    <>
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
        <Main
          onCardClick={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardButtonClick}
          cards={cards}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          textBtn={isLoading ? "Сохранение..." : "Сохранить"}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          textBtn={isLoading ? "Создание..." : "Создать"}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          textBtn={isLoading ? "Сохранение..." : "Сохранить"}
        />
        <PopupWithConfirm
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={selectedCard}
          textBtn={isLoading ? "Удаление..." : "Да"}
        />
        <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard} />
        <PopupWithError isOpen={isErrorPopupOpen} onClose={closeAllPopups} error={error} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
