import React from 'react';

const API = 'https://newsapi.org/v2/top-headlines';
const SOURCE_API = 'https://newsapi.org/v2/sources'
const API_KEY = 'ff4f1ab5e1fb4775ae6ca88a6f13a72b'

export default function Home() {

  const [data, setData] = React.useState([]);
  const [source, setSource] = React.useState('the-times-of-india')

  React.useEffect(() => {
    fetch(`${SOURCE_API}?country=in&apiKey=${API_KEY}`)
    .then(res => res.json())
    .then(res => console.log(res));
    fetch(`${API}?sources=${source}&apiKey=${API_KEY}`)
    .then(res => res.json())
    .then(res => setData(res.articles));
  }, [source]);

  const getNews = () => {
    return data.map(({title, urlToImage, url}) => (
      <li className="w-3/12 laptop:w-4/12 tablet:w-6/12 mobile:w-full">
        <div className="shadow rounded-sm m-4">
          <img width="100%" src={urlToImage}/>
          <div className="p-4">
            <span>{title}</span>
          </div>
        </div>  
      </li>
    ))
  }

  return (
    <div className="p-4 font-Reggae">
      <select style={{outline: 'none'}} onChange={(e) => setSource(e.target.value)}>
        <option value="the-times-of-india">Left</option>
        <option value="google-news-in">Neutral</option>
        <option value="the-hindu">Right</option>
      </select>
      <span className="m-4 text-5xl">Sided</span>
      <ul className="flex flex-wrap">
        {getNews()}
      </ul>
    </div>
  )
}
