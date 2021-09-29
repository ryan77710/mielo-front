const checkLength = (numToCheck, str, cb) => {
  if (str.length < numToCheck) {
    cb(false);
  } else {
    cb(true);
  }
};
export default checkLength;
