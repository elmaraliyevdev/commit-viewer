import React from "react";
import Header from "./components/Header";
import SidebarMenu from "./components/SidebarMenu";
import CommitsList from "./components/CommitsList";
import Footer from "./components/Footer";
import { CommitsContextProvider } from "./context";

function App() {
  const url = "";
  return (
    <div className="app">
      <CommitsContextProvider url={url}>
        <Header />
        <div className="main">
          <SidebarMenu />
          <CommitsList />
          <Footer />
        </div>
      </CommitsContextProvider>
    </div>
  );
}

export default App;
