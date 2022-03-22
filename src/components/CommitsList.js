import React, { useState, useEffect, useRef, useContext } from "react";
import { CommitsContext } from "../context";

function CommitsList() {
  const commitsContext = useContext(CommitsContext);
  const { url } = commitsContext;
  const [commits, setCommits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [error, setError] = useState(null);
  const [targetElement, setTargetElement] = useState(null);
  const prevY = useRef(0);

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  const handleObserver = (entities, observer) => {
    const y = entities[0].boundingClientRect.y;

    if (prevY.current > y) {
      fetchCommits();
    }

    prevY.current = y;
  };

  const observer = useRef(new IntersectionObserver(handleObserver, options));

  useEffect(() => {
    if (url != "") {
      fetchCommits();
    }
  }, [url]);

  useEffect(() => {
    if (targetElement) {
      observer.current.observe(targetElement);
    }
  }, [targetElement]);

  const fetchCommits = () => {
    console.log("fetch url", url);
    setIsLoading(true);
    fetch(`https://api.github.com/repos/${url}/commits?per_page=9`)
      .then((data) => data.json())
      .then((data) => {
        setCommits((commits) => [...commits, ...data]);
        setIsFirstLoad(false);
        setIsLoading(false);
      })
      .catch((e) => {
        alert(
          "Loading image from Unsplash failed. This is likely due to exceeding free API limit. Please clone the repo and try locally using your own API keys or come back in 60 minutes."
        );
        setError(e);
      });
  };

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

  console.log("url", url);
  console.log("error", error);

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
        {commits.length !== 0 ? (
          <div className="table-fix-head">
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
                {commits.map((commit, index) => (
                  <tr key={index}>
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
                <tr>
                  <td>
                    <div className="placeholder"></div>
                  </td>
                  <td>
                    <div className="placeholder"></div>
                  </td>
                  <td>
                    <div className="placeholder"></div>
                  </td>
                  <td>
                    <div className="placeholder"></div>
                  </td>
                </tr>
                <tr
                  style={isLoading ? { display: "none" } : null}
                  ref={setTargetElement}
                >
                  <td>
                    <div className="placeholder"></div>
                  </td>
                  <td>
                    <div className="placeholder"></div>
                  </td>
                  <td>
                    <div className="placeholder"></div>
                  </td>
                  <td>
                    <div className="placeholder"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="table">
            <h5>
              {error || error == "" ? error : "Your commits will show up here"}
            </h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommitsList;
