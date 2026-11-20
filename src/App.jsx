import { useState } from "react";
import "./App.css";
import { Articles } from "./Article/Article.jsx";
import { Header } from "./Header/Header.jsx";
import { NewArticle } from "./NewArticle/NewArticle.jsx";
import { Menu } from "./Menu/Menu.jsx";
import { Account } from "./Account/Account.jsx";

import { useTheme } from "./Theme/useTheme.js";

function App() {
  const [theme, changeTheme] = useTheme();
  const [route, setRoute] = useState("home");

  return (
    <>
      <div className="app">
        <Header onClickAccount={() => setRoute("account")} />
        {route === "home" && (
          <Articles onClickNew={() => setRoute("new_article")} />
        )}
        {route === "menu" && <Menu onClose={() => setRoute("home")} />}
        {route === "account" && (
          <Account
            theme={theme}
            onChangeTheme={changeTheme}
            onClose={() => setRoute("home")}
          />
        )}
        {route === "new_article" && (
          <NewArticle
            onClose={() => setRoute("home")}
            onChange={() => setRoute("home")}
          />
        )}
      </div>
    </>
  );
}

export default App;
