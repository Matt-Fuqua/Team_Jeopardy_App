const initialData = {
  open: false
};

const announcementDisplayReducer = (state = initialData, action) => {
  switch (action.type) {
    case "DISPLAY_ANNOUNCEMENT_MODAL":
      return {
        open: true
      };
    case "CLOSE_ANNOUNCEMENT_MODAL":
      return {
        open: false
      };
    default:
      return state;
  }
};

export default announcementDisplayReducer;
