import React from 'react';
import { connect } from 'react-redux';
import Link from './Link';


//Set VisibilityFilter Method
const setVisibilityFilter = (filter) => {
  return {
      type: 'SET_VISIBILITY_FILTER',
      filter
  };
};

//Map to State
const mapStateToLinkProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};

//Map to Props
const mapDisptchToLinkProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
}
export default connect(mapStateToLinkProps,mapDisptchToLinkProps)(Link);
