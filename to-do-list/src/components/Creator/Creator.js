import React from 'react';
import styles from './Creator.scss';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

class Creator extends React.Component {
    static propTypes = {
        text: PropTypes.string,
        
    }

    state = {
        value : '',
        visibleButtons: false,
    }

    handleChange = e => {
        // console.log(e.target)
        this.setState({
            value: e.target.value,
            visibleButtons: e.target.value.length>0,
        })
    }

    handleOK = () => {
        if(this.state.value !='') {
            this.props.action(this.state.value);
            this.setState({
                value:'',
                visibleButtons: false
            });
        }
    }

    handleCancel = () => {
        this.setState({
            value: '',
          visibleButtons: false,
        })
    }

    render() {
        return (
            <div className={styles.component}>
            <input
            type='text'
            placeholder={this.props.text}
            value={this.state.value}
            onChange={this.handleChange}
             />
             <div className={styles.buttons + (this.state.visibleButtons ? '' + styles.buttons.buttonsShown : '')}>
                 <Button onClick={this.handleOK} >OK</Button>
                 <Button onClick={this.handleCancel}>Cancel</Button>
                 </div>
            </div>
        )
    }
}

export default Creator;