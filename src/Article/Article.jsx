import React, {useEffect, useState} from 'react';
import './Article.css';
import {Tag, Tags} from '../Tag/Tag.jsx';
import {getArticles, remove, updateArticle} from '../Service/Service.js';
import {ArticleCard} from '../ArticleCard/ArticleCard.jsx';

let canvas;

export const Articles = ({ changeActiveInTag, selected, onChange, onClickNew }) => {
  const [{articles, tags}, setData] = useState({articles: [], tags: []});
  const [state, setState] = useState('loading');
  const [showTags, setShowTags] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);
  const [reorderedArticles, setReorderedArticles] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    setState('loading');
    getArticles().then(articles => {
      setData({
        tags: [],
        articles,
      });
      setReorderedArticles(articles);
      if(articles.length === 0) {
        setState('empty');
      }
    })
      .finally(() => setState('loaded'))
      .catch(() => setState('error'))
  }

  const handleDragStart = (e, index) => {
    console.log('handleDragStart');
    setDraggedIndex(index);

    let clonedDraggable = e.target.cloneNode(true);

    clonedDraggable.style.display = 'block';
    clonedDraggable.style.opacity = '0.5';
    clonedDraggable.style.position = 'absolute';
    clonedDraggable.style.top = '-1000px';
    clonedDraggable.style.left = '-1000px';
    clonedDraggable.style.borderRadius = '0px';

    document.body.appendChild(clonedDraggable);

    canvas = document.createElement('canvas');
    canvas.width = clonedDraggable.offsetWidth;
    canvas.height = clonedDraggable.offsetHeight;

    // Tornar o canvas invisível
    canvas.style.visibility = 'hidden';
    document.body.appendChild(canvas);

    let ctx = canvas.getContext('2d');

    // Definir a cor de fundo do canvas para a mesma cor de fundo da página
    ctx.fillStyle = getComputedStyle(document.body).backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = getComputedStyle(clonedDraggable).backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '20px Arial';
    ctx.fillStyle = getComputedStyle(clonedDraggable).color;
    ctx.fillText(clonedDraggable.textContent.trim(), 10, 30);

    let img = new Image();
    img.onload = function() {
      e.dataTransfer.setDragImage(img, 50, 50);
    }
    img.src = canvas.toDataURL();

    document.body.removeChild(clonedDraggable);
    console.log('handleDragStart FIM');
  };

  const handleDragOver = (index) => {
    console.log('handleDragOver');
    if (index !== draggedIndex) {
      setDraggedOverIndex(index);
    }
  };

  const handleDragEnd = () => {
    console.log('handleDragEnd');

    if (canvas) {
      document.body.removeChild(canvas);
    }

    if (draggedOverIndex !== null) {
      const updatedArticles = [...reorderedArticles];
      const draggedArticle = updatedArticles.splice(draggedIndex, 1)[0];
      updatedArticles.splice(draggedOverIndex, 0, draggedArticle);

      setReorderedArticles(updatedArticles);
      setDraggedOverIndex(null);
    }
    setDraggedIndex(null);
  };

  const handleOnRemove = async (id) => {
    await remove(id);
    await load();
    // onChange();
  };

  const handleOnFavorite = async (id, favorite) => {
      await updateArticle(id, {favorite: !favorite});
      await load();
  }

  const handleOnClickCheck = async (id, status) => {
      await updateArticle(id, {status: status === 'read' ? 'unread' : 'read'});
      await load();
  }

  if(state === 'loading') {
    return <div>Loading...</div>
  }

  if(state === 'error') {
    return <div>Error...</div>
  }

  return (
    <div className="articles">
      <div className="header">
        <h3>Articles</h3>
        {/*<button onClick={() => setShowTags(state => !state)}><svg className="icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/></svg></button>*/}
        <button onClick={onClickNew}>
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
        </button>
      </div>
      {/*{showTags && <Tags tags={tags} onClick={changeActiveInTag} selected={selected} />}*/}
      <div className="list">
        {reorderedArticles.length === 0 && <div className="empth"><p>There is no articles to show</p></div>}
        {reorderedArticles.map((article, index) => (
          <ArticleCard
            key={article.id}
            {...article}
            tabIndex={0}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={() => handleDragOver(index)}
            onDragEnd={handleDragEnd}
            isDragging={draggedIndex === index}
            onRemove={() => handleOnRemove(article.id)}
            onClickFavorite={() => handleOnFavorite(article.id, article.favorite)}
            onClickCheck={() => handleOnClickCheck(article.id, article.status)}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleCard;
