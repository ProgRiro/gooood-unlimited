import React from 'react';
import { Fade } from 'react-slideshow-image';
import slideImage1 from '../imgs/slide1.png';
import slideImage2 from '../imgs/slide2.png';
import slideImage3 from '../imgs/slide3.png';
import slideImage4 from '../imgs/slide4.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  slideContainer: {
    width: '100%',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
  },
});

const fadeImages = [slideImage1, slideImage2, slideImage3, slideImage4];

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: false,
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
