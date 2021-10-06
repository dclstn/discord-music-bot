module.exports = {
  findOption(options, query) {
    return options.find((option) => option.name === query);
  },
};
