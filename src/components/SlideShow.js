import React from 'react';
import { Fade } from 'react-slideshow-image';
import slideImage from '../slide1.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  slideContainer: {
    width: '100%',
    margin: '0 30',
  },
  imageContainer: {
    width: '100%',
  },
  image: {
    width: '90%',
  },
});

const fadeImages = [slideImage, slideImage, slideImage];

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`fade transition from ${oldIndex} to ${newIndex}`);
  },
};

const SlideShow = () => {
  const classes = useStyles();

  return (
    <div className={classes.slideContainer}>
      <Fade {...fadeProperties}>
        {fadeImages.map((img, index) => {
          return (
            <div className="each-fade" key={index}>
              <div className={classes.imageContainer}>
                <img src={img} className={classes.image} />
              </div>
            </div>
          );
        })}
      </Fade>
    </div>
  );
};

export default SlideShow;
