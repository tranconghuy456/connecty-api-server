export const SECURITY = {
  SALT_ROUNDS: 10,
  TOKEN: {
    ACCESS_TOKEN_PRIVATE_KEY: "PKQYJz+dyvGPJZeD+jrexNTZphWo4j6xyyUoDJUToOT4=",
    REFRESH_TOKEN_PRIVATE_KEY: "XQlqYovTJ2TeB1Cj5/1kGZ07Jo1XUs5FExYzKPNPc6k=",
    REFRESH_TOKEN_EXP: "1d",
    ACCESS_TOKEN_EXP: "1m",
  },
  REGEX: {
    EMAIL: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
    PHONE_NUM: /\d{3}-\d{3}-\d{4}/,
  },
};
