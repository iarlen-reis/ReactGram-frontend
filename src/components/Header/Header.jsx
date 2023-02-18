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

const Header = () => {
  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        <Link to="/">ReactGram</Link>
        <form className={styles.search__form}>
          <BsSearch />
          <input type="text" placeholder="Pesquisar" />
        </form>
        <ul className={styles.nav__links}>
          <li>
            <NavLink to="/">
              <BsHouseDoorFill />
            </NavLink>
          </li>
          <li>
            <NavLink to="/login">Entrar</NavLink>
          </li>
          <li>
            <NavLink to="/register">Cadastrar</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Header;
