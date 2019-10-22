export const github_api = (path, options = {}) => {
  return fetch(`https://api.github.com${path}`).then(res => res);
};

export const github_raw_api = (path, options = {}) => {
  return fetch(`https://raw.githubusercontent.com${path}`).then(res => res);
};
