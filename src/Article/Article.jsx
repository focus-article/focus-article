import './Article.css';
import {Tag} from '../Tag/Tag.jsx';

export const Article = ({description, tags}) => (
  <div className="article">
    <div className="article__tags">
      {
        tags.map(tag => <Tag description={tag} />)
      }
    </div>
    <div className="article__description">{description}</div>
  </div>
)

export const Articles = ({articles}) => (
  <div className="articles__container">
    {
      articles.map(article => <Article {...article}/>)
    }
  </div>
)