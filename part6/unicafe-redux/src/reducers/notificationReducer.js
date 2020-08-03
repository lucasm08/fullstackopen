const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    default:
      return state;
  }
};

export const notificationChange = (notification, duration) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    });
    await setTimeout(() => {
      dispatch({
        type: '',
        notification,
      });
    }, duration * 1000);
  };
};

export default notificationReducer;
