const createDefaultQuery = () => {
  return {
    delay: 0,
    duration: 0,
    async: false,
    zIndex: 0,
    className: null,
    text: null,
  };
};

const query = (options = {}) => {
  return Object.assign(createDefaultQuery(), options);
};

export const createDelayQuery = (delay) => {
  return [
    query({ delay }),
  ];
};

export const createSlashQuery = () => {
  return [
    query({
      duration: 50,
      className: 'slash_1-icon',
    }),
    query({
      duration: 100,
      className: 'slash_2-icon',
    }),
    query({
      duration: 50,
      className: 'slash_1-icon',
    }),
  ];
};

export const createCrossedSlashQuery = () => {
  return [
    query({
      duration: 50,
      className: 'slash_1-icon',
    }),
    query({
      duration: 50,
      className: 'slash_2-icon',
    }),
    query({
      duration: 50,
      className: 'slash_1-icon',
    }),
    query({
      duration: 50,
    }),
    query({
      duration: 50,
      className: 'reversed_slash_1-icon',
    }),
    query({
      duration: 50,
      className: 'reversed_slash_2-icon',
    }),
    query({
      duration: 50,
      className: 'reversed_slash_1-icon',
    }),
  ];
};
