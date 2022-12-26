import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as API from 'services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { Images } from './Gallery/ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

function smoothScroll() {
  const cardHeight = document
    .querySelector('ul')
    .firstElementChild.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleButton, setVisibleButton] = useState(false);

  useEffect(() => {
    setImages([]);
    setPage(1);
    setQuery(query);
  }, [query]);

  useEffect(() => {
    const fetchImg = async () => {
      try {
        if (!query) {
          return;
        }

        setIsLoading(true);
        const images = await API.getImages(query, page);
        if (images.hits.length === 0) {
          setVisibleButton(false);
          setIsLoading(false);
          toast.error('Nothing was found for your request 😥', {
            autoClose: 3000,
          });
        } else {
          setImages(prevImg => [...prevImg, ...images.hits]);
          setIsLoading(false);
          setTotalHits(images.totalHits);
        }
      } catch (error) {
        setError(true);
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchImg();
  }, [query, page, setError]);

  useEffect(() => {
    if (images.length < totalHits && images.length !== 0 && !visibleButton) {
      setVisibleButton(true);
    } else if (images.length >= totalHits && visibleButton) {
      setVisibleButton(false);
    }
  }, [images, totalHits, visibleButton]);

  useEffect(() => {
    if (page !== 1 && images.length) {
      smoothScroll();
    }
  }, [page, images.length]);

  const onClickBtn = () => {
    setPage(prevState => prevState + 1);
  };

  const handleSubmit = ({ query }) => {
    setQuery(query);
    setPage(1);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={handleSubmit} />
      {images.length !== 0 && <Images images={images} />}
      {isLoading && <Loader />}
      {visibleButton && <Button onClick={onClickBtn} />}
      <ToastContainer />
    </div>
  );
}
