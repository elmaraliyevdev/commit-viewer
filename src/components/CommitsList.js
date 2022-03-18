import React, { useContext, useState, useEffect } from "react";
import { CommitsContext } from "../context";
import loading from "../images/loading.png";

function CommitsList() {
  let currentOffset = 0;
  const [pokemon, setPokemon] = useState([]);

  const commitsContext = useContext(CommitsContext);
  const { commits, error } = commitsContext;

  function truncate(str) {
    return str.length > 10 ? str.substring(0, 60) + "..." : str;
  }

  function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function calculateDate(date) {
    const today = new Date();
    const parsedDate = parseDate(date);
    var diff = Math.floor(today.getTime() - parsedDate.getTime());

    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);

    if (months == 0) {
      return `${days} days ago`;
    } else {
      return `${months} month ago`;
    }
  }

  const loadCommits = () => {
    const tenPokemon = [];

    fetch(`https://api.github.com/repos/jquery/jquery/commits?per_page=9`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((p) => tenPokemon.push(p));
        setPokemon((pokemon) => [...pokemon, ...tenPokemon]);
      });
    currentOffset += 9;
  };

  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 1 >= scrollHeight) {
      console.log("current height", currentHeight);
      console.log("scroll height", scrollHeight);
      setTimeout(() => {
        loadCommits();
      }, 2000);
    }
  };

  useEffect(() => {
    loadCommits();
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="commits-list">
      <div className="title-container">
        <h1>Commits List</h1>
        {commits.length !== 0 && (
          <form>
            <label>Search</label>
            <input type="text" placeholder="Search" />
          </form>
        )}
      </div>
      <div className="container">
        {pokemon.length !== 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Author</th>
                  <th>Commit</th>
                  <th>Message</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {pokemon.map((commit) => (
                  <tr key={commit.sha}>
                    <td className="author">
                      <img src={commit.author.avatar_url} />
                      {commit.commit.author.name}
                    </td>
                    <td>{commit.sha.substring(0, 7)}</td>
                    <td>{truncate(commit.commit.message)}</td>
                    <td>
                      {calculateDate(
                        commit.commit.author.date.substring(0, 10)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <img src={loading} style={{ width: "100%" }} />
          </>
        ) : (
          <div className="table">
            <h5>{error != "" ? error : "Your commits will show up here"}</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommitsList;
