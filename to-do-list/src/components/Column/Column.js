import React from 'react';
import styles from './column.scss';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import Creator from '../Creator/Creator';
import {settings} from '../../data/dataStore';
import Icon from '../Icon/Icon';
import {Droppable} from 'react-beautiful-dnd';

class Column extends React.Component {
    static propTypes = {
      title: PropTypes.node,
      cards: PropTypes.array,
      icon: PropTypes.node,
      addCard: PropTypes.func,
      id: PropTypes.string,
    }

    static defaultProps = {
      icon: settings.defaultColumnIcon,
    }

    render() {
      const {title, icon, cards, addCard, id} =this.props;
      return(
        <section className = {styles.component}>
          <h3 className={styles.title}>{title}<span className={styles.icon}><Icon name={icon}/></span></h3>
          <Droppable droppableId={id}>
            { provided => (
              <div className={styles.cards} {...provided.droppableProps} ref={provided.innerRef}>
                {cards.map(card => <Card title={card.title} key={card.id} id={card.id} index={card.index}/>)}
              </div>
            )}
            
          </Droppable>
          <Creator text={settings.cardCreatorText} action={addCard}/>
        </section>
      );
    }
}

export default Column;