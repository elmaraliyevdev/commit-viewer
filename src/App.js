import React from "react";
import Header from "./components/Header";
import SidebarMenu from "./components/SidebarMenu";
import Title from "./components/Title";
import Footer from "./components/Footer";
import { CommitsContextProvider } from "./context";

function App() {
  const commits = [];
  return (
    <div className="app">
      <CommitsContextProvider commits={commits}>
        <Header />
        <div className="main">
          <SidebarMenu />
          <Title />
          <Footer />
        </div>
      </CommitsContextProvider>
    </div>
  );
}

export default App;
