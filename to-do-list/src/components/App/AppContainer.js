import {connect} from 'react-redux';
import App from './App';
import {createActionAddList} from '../../redux/listsRedux';

const mapStateToProps = state => ( {
  title: state.app.title,
  subtitle: state.app.subtitle,
  lists: state.lists,
});

const mapDispatchToProps = (dispatch) => ({
  addList: title => dispatch(createActionAddList({
    title,
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);