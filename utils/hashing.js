import bcrypt from "bcrypt";

const hashPassword = async (password, salt) => {
  return new Promise((resolve, reject) => {
    // hash using bcrypt
    bcrypt
      .hash(password, salt)
      .then((encoded) => resolve(encoded))
      .catch((error) => reject(error));
  });
};

const comparePassword = async (formPassword, userPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(formPassword, userPassword)
      .then((decoded) => resolve(decoded))
      .catch((error) => reject(error));
  });
};

export { hashPassword, comparePassword };
