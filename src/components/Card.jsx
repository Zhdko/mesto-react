function Card(props) {
  function handleClick() {
    props.onClick(props.card);
  }

  return (
    <li className="card">
      <div className="card__img-container" onClick={handleClick}>
        <img
          className="card__image"
          src={props.card.link}
          alt={`${props.card.name}. Автор: ${props.card.owner.name}`}
        />
      </div>
      <div className="card__footer">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="like">
          <button type="button" className="card__like" aria-label="Лайк" />
          <p className="like__counter">{props.card.likes.length}</p>
        </div>
      </div>
      <button type="button" className="card__delete" aria-label="Удалить" />
    </li>
  );
}

export default Card;
