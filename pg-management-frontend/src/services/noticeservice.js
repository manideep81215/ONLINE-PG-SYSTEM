// Acts like a temporary backend (in-memory store)
let notices = [];

export const getNotices = () => {
  return notices;
};

export const addNotice = (notice) => {
  notices = [
    {
      id: Date.now(),
      ...notice,
    },
    ...notices,
  ];
};

export const deleteNotice = (id) => {
  notices = notices.filter((n) => n.id !== id);
};
