const convertArrayToQueryValues = (array, mapCallback) => {
  return array
    .filter(([key, value]) => !!value)
    .map(mapCallback)
    .reduce(
      (prev, current) => {
        prev[0].push(current[0]);
        prev[1].push(current[1]);
        return prev;
      },
      [[], []]
    );
};

module.exports = convertArrayToQueryValues;
