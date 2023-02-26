import React from "react";

import styles from "./Header.module.css";
import Logo from "/logo.png";

// Components
import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { logout, reset } from "../../slices/authSlice";

const Header = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMobile, setIsMobile] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
    setIsMobile(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setIsMobile(false);

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <aside className={styles.aside}>
      <nav className={`${styles.nav} ${isMobile && styles.isMobile}`}>
        <Link to="/">
          <img src={Logo} width={150} alt="Logo do reactGram" />
        </Link>
        <form className={styles.search__form} onSubmit={handleSearch}>
          <BsSearch onClick={handleSearch} />
          <input
            type="text"
            placeholder="Pesquisar"
            onChange={({ target }) => setQuery(target.value)}
            value={query || ""}
          />
        </form>
        <ul className={styles.nav__links}>
          {auth ? (
            <>
              <li>
                <NavLink to="/" onClick={() => setIsMobile(false)}>
                  <BsHouseDoorFill />
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink
                    to={`/users/${user._id}`}
                    onClick={() => setIsMobile(false)}
                  >
                    <BsFillCameraFill />
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/profile" onClick={() => setIsMobile(false)}>
                  <BsFillPersonFill />
                </NavLink>
              </li>

              <li>
                <span onClick={handleLogout}>Sair</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Entrar</NavLink>
              </li>
              <li>
                <NavLink to="/register">Cadastrar</NavLink>
              </li>
            </>
          )}
        </ul>
        <div className={`${styles.mobile} ${isMobile && "isMobile"}`}>
          {!isMobile ? (
            <RiMenu3Fill size={30} onClick={() => setIsMobile(true)} />
          ) : (
            <RiCloseFill size={30} onClick={() => setIsMobile(false)} />
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Header;
