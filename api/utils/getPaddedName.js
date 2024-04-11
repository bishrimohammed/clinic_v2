const getPaddedName = (paddedContent, count, prefix) => {
  const paddedCount = paddedContent.toString().padStart(count, "0");
  const varname = `${prefix}${paddedCount}`;
  return varname;
};

module.exports = {
  getPaddedName,
};
