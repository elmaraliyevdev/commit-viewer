import React, { useContext } from "react";
import { CommitsContext } from "../context";

function Title() {
  const commitsContext = useContext(CommitsContext);
  const { commits } = commitsContext;

  console.log("commits", commits);

  return (
    <div className="title-container">
      <h1>Commits List</h1>
      <form>
        <label>Search</label>
        <input type="text" placeholder="Search" />
      </form>
      {commits.length !== 0 && (
        <>
          {commits.map((commit) => (
            <li key={commit.sha}>
              {commit.commit.author.name}: {commit.sha.substring(0, 7)}:{" "}
              {commit.commit.message} : {commit.commit.author.date}
            </li>
          ))}
        </>
      )}
    </div>
  );
}

export default Title;
