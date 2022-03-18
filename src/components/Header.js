import React, { useContext, useState } from "react";
import logo from "../images/codacy-logo.png";
import { CommitsContext } from "../context";

function Header() {
  const [url, setUrl] = useState("");
  const { setCommits, setError } = useContext(CommitsContext);

  function handleSubmit(event) {
    event.preventDefault();
    const repo = url.substring(url.indexOf("m/") + 2);

    fetch(`https://api.github.com/repos/${repo}/commits?per_page=9`)
      .then((response) => response.json())
      .then((data) => {
        setCommits(data);
      })
      .catch((error) => {
        setError("We couldn’t get the commits for this repository");
      });
  }

  return (
    <header>
      <img src={logo} alt="Logo" />
      <form onSubmit={handleSubmit}>
        <label>Repository URL</label>
        <input
          type="text"
          value={url}
          placeholder="Add your repository URL here"
          onChange={(e) => setUrl(e.target.value)}
        />
        <input type="submit" value="Load Commits" />
      </form>
    </header>
  );
}

export default Header;
