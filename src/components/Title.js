import React, { useContext } from "react";
import { CommitsContext } from "../context";

function Title() {
  const commitsContext = useContext(CommitsContext);
  const { commits } = commitsContext;

  function truncate(str) {
    return str.length > 10 ? str.substring(0, 60) + "..." : str;
  }

  function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function calcDate(date) {
    console.log("date", date);
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

  return (
    <>
      <div className="title-container">
        <h1>Commits List</h1>
        <form>
          <label>Search</label>
          <input type="text" placeholder="Search" />
        </form>
      </div>
      <div className="container">
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
            {commits.length !== 0 && (
              <>
                {commits.map((commit) => (
                  <tr key={commit.sha}>
                    <td className="author">
                      <img src={commit.author.avatar_url} />
                      {commit.commit.author.name}
                    </td>
                    <td>{commit.sha.substring(0, 7)}</td>
                    <td>{truncate(commit.commit.message)}</td>
                    <td>
                      {calcDate(commit.commit.author.date.substring(0, 10))}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Title;
