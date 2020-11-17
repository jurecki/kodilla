import React from 'react';
import styles from './List.scss';
import Hero from '../Hero/Hero';
import Column from '../Column/Column';
import PropTypes from 'prop-types';

class List extends React.Component {
static propTypes = {
    title: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
}

static defaultProps = {
    children: <p> I can do all the things!!!</p>
}

    render() {
        return (
            <section className={styles.container}>
                <Hero titleText={this.props.title}/>
                <div className={styles.description}>
                {this.props.children}
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