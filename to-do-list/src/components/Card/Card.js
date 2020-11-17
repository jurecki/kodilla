import React from 'react';
import styles from './Card.scss'
import PropTypes from 'prop-types';

const Card = (props) => {
    return (
        <div className={styles.component}>
        <p>{props.title}</p>
        </div>

    )
}   

Card.propTypes = {
  title: PropTypes.node,
}

export default Card;