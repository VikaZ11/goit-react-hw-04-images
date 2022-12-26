import { useState } from 'react';
import PropTypes from 'prop-types';
import { Item, Img } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export function ImageGalleryItem({ image }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => (!prevState));
  };

  const { webformatURL, tags, largeImageURL } = image;
  return (
    <Item>
      <Img src={webformatURL} alt={tags} onClick={toggleModal} />
      {showModal && (
        <Modal
          onClose={toggleModal}
          imageUrl={largeImageURL}
          imageTags={tags}
        />
      )}
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
