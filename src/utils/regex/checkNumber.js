const checkNumber = (str, cb) => {
  const checkNumber = /\d+/;
  if (checkNumber.test(str)) {
    cb(true);
  } else {
    cb(false);
  }
};
export default checkNumber;
