import React, { useEffect, useContext } from "react";
import logo from "../images/codacy-logo.png";
import { Octokit } from "@octokit/core";
import { CommitsContext } from "../context";

function Header() {
  const { setCommits } = useContext(CommitsContext);

  const octokit = new Octokit({
    auth: "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",
  });

  useEffect(() => {
    const response = octokit.request("GET /repos/{owner}/{repo}/commits", {
      owner: "elmaraliyevdev",
      repo: "progress-bars",
    });

    response.then(function(value) {
      setCommits(value.data);
    });
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
