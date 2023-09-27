import React, {useEffect, useState} from 'react';
import './Article.css';
import {Tag, Tags} from '../Tag/Tag.jsx';
import {list, remove} from '../Service/Service.js';

const ArticleCard = ({
   title,
   tags,
   readTime,
   tabIndex,
   onDragStart,
   onDragOver,
   onDragEnd,
   isDragging,
   url,
   onRemove,
}) => {
  const handleOnClickArticle = () => window.open(url, '_blank');

  return (
    <div
      className={isDragging ? 'card dragging' : 'card'}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      tabIndex={tabIndex}
    >
      <h2 className="title">{title}</h2>
      {/*<div className="tags">*/}
      {/*  {tags.map((tag, index) => (*/}
      {/*    <Tag key={index} description={tag} tabIndex={-1} />*/}
      {/*  ))}*/}
      {/*</div>*/}
      <div className="read-time">
        <svg className="icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
        <span>{readTime}min</span>
      </div>
      <div className="actions">
        {/*<button><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8h32v96H128V192c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V288h96v96H192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8H288V288h96v32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6v32H288V128h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64z"/></svg></button>*/}
        <button onClick={onRemove}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
        </button>
        <button onClick={handleOnClickArticle}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg>
        </button>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
        </button>
      </div>
    </div>
  )
};

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
    list().then(articles => {
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

  const handleOnRemove = async (url) => {
    await remove(url);
    await load();
    // onChange();
  };

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
          <div key={article.url}>
            <ArticleCard
              {...article}
              tabIndex={0}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={() => handleDragOver(index)}
              onDragEnd={handleDragEnd}
              isDragging={draggedIndex === index}
              onRemove={() => handleOnRemove(article.url)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleCard;
