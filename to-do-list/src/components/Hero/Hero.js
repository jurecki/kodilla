import React from 'react';
import styles from './Hero.scss';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

const Hero = (props) => {
  return (
    <section className={styles.component}>
      <h2 className={styles.title}>{ReactHtmlParser(props.titleText)}</h2>
      <picture>
        <source className={styles.image} media="(min-width:1280px)" srcSet={props.imageBig}/>
        <source className={styles.image} media="(min-width:800px)" srcSet={props.imageNormal}/>
        <source className={styles.image} media="(min-width:360px)" srcSet={props.imageSmall}/>
        <img className={styles.image} src={props.imageNormal} alt='hero'/>
      </picture>
            
    </section>
  );
};

Hero.propTypes = {
  titleText: PropTypes.node.isRequired,
  imageBig: PropTypes.node,
  imageSmall: PropTypes.node,
  imageNormal: PropTypes.node,
};

export default Hero;