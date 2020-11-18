import {connect} from 'react-redux';
import List from './List';

export const getColumnsForList = (columns, listId) => columns.filter(column => column.listId == listId);

const mapStateToProps = (state ,props) => {
//   console.log(state.columns, props.id);
  return ( {
    columns: getColumnsForList(state.columns, props.id),
       
  });
    
}
;

export default connect(mapStateToProps)(List);