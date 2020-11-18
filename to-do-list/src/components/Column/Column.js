import React from 'react';
import styles from './column.scss';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import Creator from '../Creator/Creator';
import {settings} from '../../data/dataStore';
import Icon from '../Icon/Icon';

class Column extends React.Component {
    static propTypes = {
      title: PropTypes.node,
      cards: PropTypes.array,
      icon: PropTypes.node,
      addCard: PropTypes.func,
    }

    static defaultProps = {
      icon: settings.defaultColumnIcon,
    }

    render() {
      const {title, icon, cards, addCard} =this.props;
      return(
        <section className = {styles.component}>
          <h3 className={styles.title}>{title}<span className={styles.icon}><Icon name={icon}/></span></h3>
          {cards.map(card => <Card title={card.title} key={card.id}/>)}
          <Creator text={settings.cardCreatorText} action={addCard}/>
        </section>
      );
    }
}

export default Column;