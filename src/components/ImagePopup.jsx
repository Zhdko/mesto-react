function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_action_open-img ${isOpen ? "popup_opened" : ""}`}>
      <figure className="full-width">
        <img
          className="full-width__image"
          src={card !== null ? card.link : ""}
          alt={`${card !== null ? card.name : ""}. Автор: ${card !== null ? card.owner.name : ""}`}
        />
        <figcaption className="full-width__caption">{card !== null ? card.name : ""}</figcaption>
        <button type="button" className="button-icon button-icon_action_close" aria-label="Закрыть" onClick={onClose} />
      </figure>
    </div>
  );
}

export default ImagePopup;
