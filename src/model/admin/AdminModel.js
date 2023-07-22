import AdminSchema from "./AdminSchema.js";

export const insertAdmin = (obj) => {
  return AdminSchema(obj).save();
};

export const getAdminByEmail = (email) => {
  return AdminSchema.findOne({ email });
};

export const getAdmin = () => {
  return AdminSchema.find();
};

export const updateAdminById = ({ _id, ...rest }) => {
  return AdminSchema.findByAndUpdate(_id, rest);
};

export const deleteAdmin = (_id) => {
  return AdminSchema.findByIdAndDelete(_id);
};
