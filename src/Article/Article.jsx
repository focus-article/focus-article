import React from 'react';
import './Article.css';
import {Tag, Tags} from '../Tag/Tag.jsx';

const ArticleCard = ({ title, tags, readTime }) => (
  <div className="card">
    <h2 className="title">{title}</h2>
    <div className="tags">
      {tags.map((tag, index) => (
        <Tag key={index} description={tag} />
      ))}
    </div>
    <div className="read-time">
      <svg className="icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
      <span>{readTime}min</span>
    </div>
  </div>
);

export const Articles = ({articles, changeActiveInTag, tags, selected}) => (
  <div className="articles">
    <Tags
      tags={tags}
      onClick={changeActiveInTag}
      selected={selected}
    />
    <div className="header">
      <h3>Articles</h3>
      <button><svg className="icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/></svg></button>
    </div>
    <div className="list">
      {
        articles.map(article => <ArticleCard {...article}/>)
      }
    </div>
  </div>
)

export default ArticleCard;
