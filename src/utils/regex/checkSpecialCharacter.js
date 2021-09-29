const chekSpecialCharacter = (str, cb) => {
  const spécificCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

  if (spécificCharacter.test(str)) {
    cb(true);
  } else {
    cb(false);
  }
};
export default chekSpecialCharacter;
