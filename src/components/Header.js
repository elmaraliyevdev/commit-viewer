import React, { useEffect, useContext } from "react";
import logo from "../images/codacy-logo.png";
import { CommitsContext } from "../context";

function Header() {
  const { setCommits } = useContext(CommitsContext);

  useEffect(() => {
    fetch("https://api.github.com/repos/jquery/jquery/commits")
      .then((response) => response.json())
      .then((data) => setCommits(data));
  }, []);

  return (
    <header>
      <img src={logo} alt="Logo" />
      <form>
        <label>Repository URL</label>
        <input type="text" placeholder="Add your repository URL here" />
        <input type="submit" value="Load Commits" />
      </form>
    </header>
  );
}

export default Header;
