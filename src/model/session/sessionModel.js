import SessionSchema from "./sessionSchema.js";

export const insertNewSession = (obj) => {
  return SessionSchema(obj).save();
};
