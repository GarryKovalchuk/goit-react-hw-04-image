import React, { useState, useEffect } from 'react';
import { fetchImages } from './ServiseAPI/API';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { animateScroll } from 'react-scroll';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('largeImageURL');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const getImages = async () => {
      setIsLoading(true);
      try {
        const { hits, totalHits } = await fetchImages(searchQuery, page);
        setImages(prevImages => [...prevImages, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / per_page));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [searchQuery, page, per_page]);

  const formSubmit = query => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
    setLoadMore(false);
  };

  const onloadMore = () => {
    setPage(prevPage => prevPage + 1);
    scrollOnMoreButton();
  };

  const scrollOnMoreButton = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };

  const openModal = imageURL => {
    setShowModal(true);
    setLargeImageURL(imageURL);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Searchbar onSubmit={formSubmit} />

      {isLoading && <Loader />}
      <ImageGallery images={images} openModal={openModal} />

      {loadMore && <Button onloadMore={onloadMore} page={page} />}

      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </>
  );
};
