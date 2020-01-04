import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: '1rem',
  };
  return notification ? <div style={style}>{notification}</div> : null;
};

const mapStateToProps = state => {
  return { notification: state.notification };
};
export default connect(mapStateToProps)(Notification);
