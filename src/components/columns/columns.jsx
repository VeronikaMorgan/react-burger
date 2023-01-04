import React, { Children } from 'react';
import PropTypes from 'prop-types';
import columnsStyles from './columns.module.css';

const Columns = ({children}) => {
  return (
    <div className={columnsStyles.columns}>
     {children}
    </div>
  )
}

Columns.propTypes = {
  children: PropTypes.node.isRequired
}

export default Columns;