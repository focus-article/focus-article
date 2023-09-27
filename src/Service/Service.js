
const getData = () => {
  const data = localStorage.getItem('articles');
  if(!data) return [];
  const json = JSON.parse(data);
  return json;
}

const setData = (data) => {
  localStorage.setItem('articles', JSON.stringify(data));
}

export const save = async (article) => {
  const db = getData();
  setData([
    article,
    ...db
  ]);
}

export const list = async () => {
  return getData();
}

export const remove = async (url) => {
  const db = getData();
  setData(db?.filter(article => article.url !== url));
}