import {useEffect, useState} from 'react';
import './App.css'
import {Articles} from './Article/Article.jsx';
import {Header} from './Header/Header.jsx';
import {NewArticle} from './NewArticle/NewArticle.jsx';
import {Menu} from './Menu/Menu.jsx';

function App() {
  const [route, setRoute] = useState('home');

  return (
    <>
      <div className="app">
        <Header />
        {route === 'home' && <Articles onClickNew={() => setRoute('new_article')} />}
        {route === 'menu' && <Menu onClose={() => setRoute('home')} />}
        {
          route === 'new_article' && (
            <NewArticle
              onClose={() => setRoute('home')}
              onChange={() => setRoute('home')}
            />
          )
        }
      </div>
    </>
  )
}

export default App
