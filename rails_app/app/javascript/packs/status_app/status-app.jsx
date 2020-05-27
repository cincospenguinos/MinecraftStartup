import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useStatus from './check-status-hook/use-status';

export default function StatusApp() {
  const status = useStatus();

  return (<div>{ status }</div>);
}

StatusApp.propTypes = {};

StatusApp.defaultProps = {};
