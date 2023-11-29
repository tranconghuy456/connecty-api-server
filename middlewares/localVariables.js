export const localVariables = (req, res, next) => {
  req.app.locals = {
    OTP: req.app.locals.OTP || null,
    Session: req.app.locals.Session || null,
  };
  next();
};
