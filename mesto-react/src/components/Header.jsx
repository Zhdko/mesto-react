import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <a href="./index.html" className="link">
        <img
          src={logo}
          alt="Место.Россия."
          className="logo logo_place_header"
        />
      </a>
    </header>
  )
}
export default Header