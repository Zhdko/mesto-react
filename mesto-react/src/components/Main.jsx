import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {
  let [userName, setUserName] = React.useState();
  let [userDescription, setUserDescription] = React.useState();
  let [userAvatar, setUserAvatar] = React.useState();
  let [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()]).then((res) => {
      setUserName(res[0].name);
      setUserDescription(res[0].about);
      setUserAvatar(res[0].avatar);
      setCards(res[1]);
    });
  }, []);

  return (
    <main className="content page__content">
      <section className="profile">
        <div className="profile__avatar">
          <button type="button" aria-label="Редактировать профиль." className="profile__edit-avatar" onClick={props.onEditAvatar} />
          <img alt="Фото профиля." className="profile__img" src={userAvatar} />
        </div>
        <div className="profile__container">
          <div className="profile__info">
            <h1 className="profile__username">{userName}</h1>
            <button type="button" className="button-icon button-icon_action_edit" aria-label="Редактировать профиль" onClick={props.onEditProfile} />
            <p className="profile__userjob">{userDescription}</p>
          </div>
          <button type="button" className="button-icon button-icon_action_add" aria-label="Добавить новое фото" onClick={props.onAddPlace} />
        </div>
      </section>
      <section className="gallery">
        <ul className="gallery__list list">
          {cards.map((card) => (
            <Card key={card._id} card={card} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
