import React from "react";
import Header from "./components/Header";
import SidebarMenu from "./components/SidebarMenu";
import Title from "./components/Title";
import { CommitsContextProvider } from "./context";

function App() {
  const commits = [
    // { id: 1, name: "John" },
    // { id: 2, name: "Joanna" },
  ];
  return (
    <div className="app">
      <CommitsContextProvider commits={commits}>
        <Header />
        <div className="main">
          <SidebarMenu />
          <Title />
        </div>
      </CommitsContextProvider>
    </div>
  );
}

export default App;
