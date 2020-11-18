import React from 'react';
import styles from './List.scss';
import Hero from '../Hero/Hero';
import Column from '../Column/ColumnContainer';
import Creator from '../Creator/Creator';
import PropTypes from 'prop-types';
import {settings} from '../../data/dataStore';
import ReactHtmlParser from 'react-html-parser';

class List extends React.Component {

static propTypes = {
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  columns: PropTypes.array,
  imageSmall: PropTypes.node,
  imageBig: PropTypes.node,
  imageNormal: PropTypes.node,
}

static defaultProps = {
  description: settings.defaultListDescription,
}

showList = () => {
  const container = document.querySelector('section');
  container.style.opacity = 1;
}

render() {
  const {title, imageSmall, imageNormal, imageBig, description, columns} = this.props;
  return (
    <div>
      <button onClick={this.showList} className={styles.showList}>ShowList</button>
      <section className={styles.container}>
        <Hero titleText={title} 
          imageSmall={imageSmall}
          imageBig = {imageBig}
          imageNormal = {imageNormal}
        />
        <div className={styles.description}>
          {ReactHtmlParser(description)}
        </div>
        <div className={styles.columns}>
          {columns.map(columnData => <Column key={columnData.id} {...columnData} />)}
        </div>
        <div className={styles.creator}>
          <Creator text={settings.columnCreatorText} action={title=>{this.addColumn(title);}}/>
        </div>
      </section>
    </div>
  );
}
}

export default List;