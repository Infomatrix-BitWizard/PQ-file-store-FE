export const debounce = async (time = 100) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });

  return promise;
};
