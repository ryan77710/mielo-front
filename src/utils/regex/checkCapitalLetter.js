const checkCapitalLetter = (str, cb) => {
  const checkCapital = /[A-Z]/;
  if (checkCapital.test(str)) {
    cb(true);
  } else {
    cb(false);
  }
};
export default checkCapitalLetter;
