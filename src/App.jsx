import {useEffect, useState} from 'react';
import {getData} from './article.mock.js';
import './App.css'
import {Tags} from './Tag/Tag.jsx';
import {Articles} from './Article/Article.jsx';

function App() {
  const [{articles, tags}, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData().then(data => {
      setData({
        ...data,
        articles: data.articles.map(a => ({...a, show: true})),
      });
    }).finally(() => setLoading(false));
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

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        <header>Minimal Article</header>
        <Tags
          tags={tags}
          onClick={changeActiveInTag}
          selected={selected}
        />
        <Articles articles={articles.filter(a => a.show)} />
      </div>
    </>
  )
}

export default App
