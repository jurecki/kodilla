import React from 'react';
import styles from './Hero.scss';

const Hero = () => {
    return (
        <section className={styles.component}>
            <h2 className={styles.title}>Things to do</h2>
            <picture>
                <source className={styles.image} media="(min-width:1280px)" srcSet='../../../public/images/space_big.png'/>
                <source className={styles.image} media="(min-width:800px)" srcSet='../../../public/images/space_normal.png'/>
                <source className={styles.image} media="(min-width:360px)" srcSet='../../../public/images/space_small.png'/>
                <img className={styles.image} src='../../../public/images/space_big.png' alt='hero'/>
            </picture>
            
        </section>
    )
}

export default Hero;