function ImagePopup(props) {
  return (
    <div className={`popup popup_action_open-img ${props.isOpen ? "popup_opened" : ""}`}>
      <figure className="full-width">
        <img className="full-width__image" src={props.card.link} alt={`${props.card.name}. Автор: ${props.card.owner.name}`} />
        console.log(props.card)
        <figcaption className="full-width__caption">{props.card.name}</figcaption>
        <button type="button" className="button-icon button-icon_action_close" aria-label="Закрыть" onClick={props.onClose} />
      </figure>
    </div>
  );
}

export default ImagePopup;
