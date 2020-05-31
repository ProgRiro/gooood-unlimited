import React from 'react';
import { Fade } from 'react-slideshow-image';
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

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: false,
};

const SlideShow = (props) => {
  const classes = useStyles();
  const fadeImages = props.images;

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
