function Card(props) {
  return (
    <li className="card">
      <div className="card__img-container">
        <img className="card__image" src={props.card.link} />
      </div>
      <div className="card__footer">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="like">
          <button type="button" className="card__like" aria-label="Лайк"></button>
          <p className="like__counter">{props.card.likes.length}</p>
        </div>
      </div>
      <button type="button" className="card__delete" aria-label="Удалить"></button>
    </li>
  );
}

export default Card;
