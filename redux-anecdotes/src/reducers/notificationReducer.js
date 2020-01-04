const initialMessage = null;

const notificationReducer = (state = initialMessage, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.data;
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};

// export const notify = message => {
//   return {
//     type: 'NOTIFY',
//     data: { message },
//   };
// };

// export const removeNotice = () => {
//   return {
//     type: 'CLEAR',
//   };
// };

export const setNotification = (message, delay = 5) => {
  const timeout = secs => {
    return new Promise(resolve => setTimeout(resolve, secs * 1000));
  };
  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: message,
    });
    await timeout(delay);
    dispatch({
      type: 'CLEAR',
    });
  };
};

export default notificationReducer;
