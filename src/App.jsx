import {useEffect, useState} from 'react';
import {getData} from './article.mock.js';
import './App.css'
import {Articles} from './Article/Article.jsx';
import {Header} from './Header/Header.jsx';

function App() {
  const [{articles, tags}, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [state, setState] = useState('loading');

  useEffect(() => {
    getData().then(data => {
      const articles = data.articles.map(a => ({...a, show: true}))
      if(articles.length > 0) {
        setData({
          ...data,
          articles,
        });
      } else {
        setState('empty');
      }
    })
      .finally(() => setState('loaded'))
      .catch(() => setState('error'))
  }, []);

  const changeActiveInTag = (tag) => {
    const alreadHere = selected.some(s => s === tag);
    if(!alreadHere) {
      setSelected(state => [...state, tag])
    } else {
      setSelected(state => [...state.filter(s => s !== tag)])
    }
  }

  useEffect(() => {
    if(selected.length) {
      setData({
        tags: [...tags],
        articles: [
          ...articles.map(a => ({
            ...a,
            show: a.tags?.some(t => selected.includes(t)),
          }))
        ]
      });
    }
  }, [selected]);

  if(state === 'loading') {
    return <div>Loading...</div>
  }

  if(state === 'error') {
    return <div>Error...</div>
  }

  return (
    <>
      <div className="app">
        <Header />
        <Articles
          articles={articles.filter(a => a.show)}
          changeActiveInTag={changeActiveInTag}
          tags={tags}
          selected={selected}
        />
      </div>
    </>
  )
}

export default App
