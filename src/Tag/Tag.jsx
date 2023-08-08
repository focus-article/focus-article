import './Tag.css';

export const Tag = ({description, onClick, isSelected}) => (
  <button
    className={isSelected ? 'tags__tag active' : 'tags__tag'}
    onClick={onClick}
  >{description}</button>
)

export const Tags = ({tags, onClick, selected}) => (
  <div className="tags__container">
    {
      tags.map(tag => <Tag
        description={tag}
        onClick={() => onClick(tag)}
        isSelected={selected.some(s => s === tag)}
      />)
    }
  </div>
)