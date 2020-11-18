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
    }
    
    state = {
      cards: this.props.cards || [],
    }

    addCard = (title) => {
      this.setState( state => ({
        cards: [
          ...state.cards,
          {
            key: this.state.cards.length>0 ? state.cards[state.cards.length-1].key+1 : 0,
            title,
          },
        ],
      })
      );

    }


    render() {
      return(
        <section className = {styles.component}>
          <h3 className={styles.title}>{this.props.title}<span className={styles.icon}><Icon name={this.props.icon}/></span></h3>
          {this.state.cards.map(card => <Card title={card.title} key={card.key}/>)}
          <Creator text={settings.cardCreatorText} action={title=>{this.addCard(title);}}/>
        </section>
      );
    }
}

export default Column;