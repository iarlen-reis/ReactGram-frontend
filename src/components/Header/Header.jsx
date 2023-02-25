import React from "react";

import styles from "./Header.module.css";

// Components
import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";

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

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        <Link to="/">ReactGram</Link>
        <form className={styles.search__form} onSubmit={handleSearch}>
          <BsSearch />
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
                <NavLink to="/">
                  <BsHouseDoorFill />
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to={`/users/${user._id}`}>
                    <BsFillCameraFill />
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/profile">
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
      </nav>
    </aside>
  );
};

export default Header;
