import React from 'react';
import styles from './Hero.scss';
import PropTypes from 'prop-types';

const Hero = (props) => {
    return (
        <section className={styles.component}>
            <h2 className={styles.title}>{props.titleText}</h2>
            <picture>
                <source className={styles.image} media="(min-width:1280px)" srcSet='../../../public/images/space_big.png'/>
                <source className={styles.image} media="(min-width:800px)" srcSet='../../../public/images/space_normal.png'/>
                <source className={styles.image} media="(min-width:360px)" srcSet='../../../public/images/space_small.png'/>
                <img className={styles.image} src='../../../public/images/space_big.png' alt='hero'/>
            </picture>
            
        </section>
    )
}

Hero.propTypes = {
    titleText: PropTypes.node.isRequired
}

export default Hero;