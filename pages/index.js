import React from 'react';
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

const API = 'https://gnews.io/api/v4/top-headlines';
const SOURCE_API = 'https://newsapi.org/v2/sources'
const API_KEY = '18200abe1b83ecae344a2edfb8a95969'

export default function Home() {

  const [data, setData] = React.useState([]);
  const [source, setSource] = React.useState('the-times-of-india');

  React.useEffect(() => {
    fetch(`${API}?country=in&token=${API_KEY}`)
    .then(res => res.json())
    .then(res => setData(res.articles));
  }, [source]);

  const Modal = (props) => {
      const {news} = props;
      // const inverted = useInvertedScale();
      return (
        <div className="modal">
        <motion.div
          exit={{ opacity: 'initial' }}
          layoutId={`card-container-${news.title}`}
          className="shadow-xl rounded-lg mobile:w-full desktop:w-6/12 left-1/2 modal-dialog"
        >
           <motion.div
          layoutId={`img-container-${news.title}`} 
        >
            <img width="100%" className="rounded-lg" style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}} src={news.image}/>
            </motion.div>
            <motion.div style={{display: 'flex', flexDirection: 'column'}} layoutId={`title-container-${news.title}`} className="p-4 flex">
              <span className="text-2xl">{news.title}</span>
            </motion.div>
            <motion.div initial={{opacity: 1}} exit={{ opacity: 0}} className="p-4">
              <span style={{color: '#9d9ca1'}}>{news.description}<a target="__blank" style={{color: 'blue', textDecoration: 'underline'}} onClick={(e) => e.stopPropagation()} href={news.url}> read more</a></span>
            </motion.div>
        </motion.div>
        </div>
      )

  }

  const Item = (props) => {
    const {news} = props;
    const [modal, setModal] = React.useState(false);
    
    return (
      <li onClick={() => setModal(!modal)} className="w-3/12 laptop:w-4/12 tablet:w-6/12 mobile:w-full">
        <AnimatePresence>
          {modal && <Modal news={news}/>}
        </AnimatePresence>
      <motion.div
        layoutId={`card-container-${news.title}`} 
        className="shadow-xl rounded-lg m-4"
      >
        <motion.div
          layoutId={`img-container-${news.title}`} 
        >
          <img width="100%" className="rounded-lg" src={news.image}/>
        </motion.div>
        <motion.div layoutId={`title-container-${news.title}`} className="p-4">
          <span>{news.title}</span>
        </motion.div>
      </motion.div>  
    </li>
    )
  }

  const getNews = () => {
    return data.map((news) => (
      <Item news={news}/>
    ))
  }

  return (
    <div style={{color: 'white', backgroundColor: 'black', minHeight: '100vh'}} id="app-container" className="p-4 font-Mukta">
      <select style={{outline: 'none', backgroundColor: '#000'}} onChange={(e) => setSource(e.target.value)}>
        <option value="the-times-of-india">Left</option>
        <option value="google-news-in">Neutral</option>
        <option value="the-hindu">Right</option>
      </select>
      <span className="m-4 text-5xl">Sided</span>
      <AnimateSharedLayout>
        <ul className="flex flex-wrap">
          {getNews()}
        </ul>
      </AnimateSharedLayout>
    </div>
  )
}
