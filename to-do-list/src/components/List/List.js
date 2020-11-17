import React from 'react';
import styles from './List.scss';
import Hero from '../Hero/Hero';
import Column from '../Column/Column';
import PropTypes from 'prop-types';
import {settings} from '../../data/dataStore';
import ReactHtmlParser from 'react-html-parser';

class List extends React.Component {
static propTypes = {
    title: PropTypes.node.isRequired,
    description: PropTypes.node,
    columns: PropTypes.array,
}

static defaultProps = {
    description: settings.defaultListDescription,
}

    render() {
        return (
            <section className={styles.container}>
                <Hero titleText={this.props.title} 
                imageSmall={this.props.imageSmall}
                imageBig = {this.props.imageBig}
                imageNormal = {this.props.imageNormal}
                />
                <div className={styles.description}>
                {ReactHtmlParser(this.props.description)}
                </div>
                <div className={styles.columns}>
                    <Column title='Columna 1' />
                    <Column title='Columna 2' />
                    <Column title='Columna 3' />
                </div>
            </section>
        )
    }
}

export default List;