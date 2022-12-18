import { ColorRing } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <ColorRing
      height="150"
      width="150"
      colors={['#3f51b5', '#f47e60', '#f8b26a', '#abbd81', '#3f51b5']}
      wrapperStyle={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};
