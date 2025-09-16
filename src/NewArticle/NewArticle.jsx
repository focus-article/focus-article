import React from "react";
import "./NewArticle.css";
import { saveArticle } from "../Service/Service.js";

export const NewArticle = ({ onClose, onChange }) => {
  const [state, setState] = React.useState();
  const [data, setData] = React.useState();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const url = event.target.url.value;

    if (!url) {
      return;
    }

    fetch(`http://localhost:3000/?url=${url}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setState("loaded");
      })
      .catch(() => setState("error"));
  };

  const handleOnSave = async (event) => {
    event.preventDefault();
    await saveArticle({
      title: event.target.title.value,
      url: event.target.url.value,
      tags: event?.target?.tags?.value?.trim()?.split(","),
      status: "unread",
      author: event.target.author.value,
      image: event.target.image.value,
      publicationDate: event.target.publicationDate.value,
      readTime: +event.target.readTime?.value,
      description: event.target.description.value,
    });
    onChange();
  };

  const isDisabledInput = (url) => ["url"].some((i) => i === url);

  function generateLabelNameByKey(key) {
    const map = {
      readTime: "Read Time",
      publicationDate: "Publication Date",
    };
    if (map[key]) {
      return map[key];
    }
    return key;
  }

  function generatePlaceholder(key) {
    const map = {
      tags: '"tag1, tags"',
    };
    if (map[key]) {
      return map[key];
    }
    return "";
  }

  return (
    <div className="new_article">
      <div className="header">
        <h3 className="title">New Article</h3>
        <button onClick={onClose}>
          <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
      </div>
      <div className="body">
        <form onSubmit={handleOnSubmit}>
          <label htmlFor="url">URL</label>
          <input
            type="text"
            name="url"
            id="url"
            placeholder="https//yourarticle.com/abc"
          />
          <button type="submit">
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
            </svg>
          </button>
        </form>
        {state === "error" && <div>We got an error. Try Again</div>}
        {state === "loading" && <div>Loading...</div>}
        {state === "loaded" && (
          <div className="info">
            <form onSubmit={handleOnSave}>
              <table>
                {Object.keys(data).map((key) => (
                  <tr className="table_values" key={key}>
                    <td>{generateLabelNameByKey(key)}:</td>
                    <td>
                      <input
                        type="text"
                        name={key}
                        value={data[key]}
                        disabled={isDisabledInput(key)}
                        placeholder={generatePlaceholder(key)}
                        onChange={(event) => {
                          setData((_data) => ({
                            ..._data,
                            [key]: event?.target?.value,
                          }));
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </table>
              <button type="submit">
                Save Article
                <svg
                  className="icon"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                </svg>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
