import React from 'react';
import styles from './Home.scss';
import PropTypes from 'prop-types';
import List from '../List/ListContainer';
import Creator from '../Creator/Creator';
import {settings} from '../../data/dataStore';
import Search from '../Search/SearchContainer';
import {DragDropContext} from 'react-beautiful-dnd';

class Home extends React.Component {
    static propTypes = {
      title: PropTypes.node,
      subtitle: PropTypes.node,
      lists: PropTypes.array,
      addList: PropTypes.func,
      moveCard: PropTypes.func,
    }

    render() {
      const {title, subtitle, lists, addList, moveCard} = this.props;

      const moveCardHandler = result => {
        if(
          result.destination && (result.destination.index !== result.source.index || result.destination.droppableId !==result.source.droppableId)
        )
        {
          moveCard ( {
            id: result.draggableId,
            dest: {
              index: result.destination.index,
              columnId: result.destination.droppableId,
            },
            src: {
              index: result.source.index,
              columnId: result.source.droppableId,
            },
          });
        }
      };

      return(
        <main className={styles.component}>
          <h1 className={styles.title}>{title}</h1>
          <h2 className={styles.subtitle}>{subtitle}</h2>
        
          <div className={styles.creator}>
            <Creator text={settings.listCreatorText} action={addList}/>
          </div>
          <Search />
          <DragDropContext onDragEnd={moveCardHandler}>
            { 
              lists.map(listData => <List key={listData.id} {...listData}/>)
            }
          </DragDropContext>
        </main>
      );
    }
}

export default Home;