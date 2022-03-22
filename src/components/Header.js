import React, { useContext, useState } from "react";
import logo from "../images/codacy-logo.png";
import { CommitsContext } from "../context";

function Header() {
  const [commitsUrl, setCommitsUrl] = useState("");
  const { setUrl } = useContext(CommitsContext);

  function handleSubmit(event) {
    event.preventDefault();
    const repo = commitsUrl.substring(commitsUrl.indexOf("m/") + 2);

    setUrl(repo);
  }

  console.log("commits url", commitsUrl);

  return (
    <header>
      <img src={logo} alt="Logo" />
      <form onSubmit={handleSubmit}>
        <label>Repository URL</label>
        <input
          type="text"
          value={commitsUrl}
          placeholder="Add your repository URL here"
          onChange={(e) => setCommitsUrl(e.target.value)}
        />
        <input type="submit" value="Load Commits" />
      </form>
    </header>
  );
}

export default Header;
