import React from 'react';
import styles from './Card.scss';
import PropTypes from 'prop-types';
import {Draggable} from 'react-beautiful-dnd';

const Card = (props) => {
  return (
    // <div className={styles.component}>
    //   {props.title}
    // </div>
    <Draggable draggableId={props.id} index={props.index}>
      { (provided) => (
        <article
          className={styles.component}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.title}
        </article>
      )}
      
    </Draggable>
  );
};   

Card.propTypes = {
  title: PropTypes.node,
  id: PropTypes.string,
  index: PropTypes.node,
};

export default Card;