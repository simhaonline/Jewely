import {connect} from 'react-redux';
import {updateFilter} from '../../actions/filter_actions';
import {FilterForm} from './filter_form';

const mapStateToProps = (state) => {
  return {
    search: state.ui.filters.search,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilter: (filter, value) => dispatch(updateFilter(filter, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm);
