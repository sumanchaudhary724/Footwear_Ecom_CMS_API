import ProductSchema from "./ProductSchema.js";

export const addProduct = (obj) => {
  return ProductSchema(obj).save();
};

export const getProducts = () => {
  return ProductSchema.find();
};
export const deleteProductById = (_id) => {
  return ProductSchema.findByIdAndDelete(_id);
};

export const findOneProductByFilter = ({ filter }) => {
  return ProductSchema.findOne(filter);
};
export const updateProductById = (_id, obj) => {
  return ProductSchema.findByIdAndUpdate(_id, obj, { new: true });
};
