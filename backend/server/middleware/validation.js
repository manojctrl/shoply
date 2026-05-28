import { body, validationResult } from "express-validator";

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: "Validation error", 
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

// Auth Validation Rules
export const validateRegister = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  
  body("email")
    .trim()
    .isEmail().withMessage("Valid email is required")
    .normalizeEmail(),
  
  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number"),
];

export const validateLogin = [
  body("email")
    .trim()
    .isEmail().withMessage("Valid email is required")
    .normalizeEmail(),
  
  body("password")
    .notEmpty().withMessage("Password is required"),
];

// Product Validation Rules
export const validateProduct = [
  body("name")
    .trim()
    .notEmpty().withMessage("Product name is required")
    .isLength({ min: 3 }).withMessage("Product name must be at least 3 characters"),
  
  body("brand")
    .trim()
    .notEmpty().withMessage("Brand is required"),
  
  body("price")
    .isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  
  body("originalPrice")
    .isFloat({ min: 0 }).withMessage("Original price must be a positive number"),
  
  body("category")
    .trim()
    .notEmpty().withMessage("Category is required"),
  
  body("image")
    .trim()
    .isURL().withMessage("Valid image URL is required"),
];

// Order Validation Rules
export const validateOrder = [
  body("orderItems")
    .isArray({ min: 1 }).withMessage("Order must contain at least one item"),
  
  body("shippingAddress")
    .notEmpty().withMessage("Shipping address is required"),
  
  body("shippingAddress.address")
    .trim()
    .notEmpty().withMessage("Street address is required"),
  
  body("shippingAddress.city")
    .trim()
    .notEmpty().withMessage("City is required"),
  
  body("shippingAddress.phone")
    .trim()
    .isMobilePhone().withMessage("Valid phone number is required"),
];

// Category Validation Rules
export const validateCategory = [
  body("name")
    .trim()
    .notEmpty().withMessage("Category name is required")
    .isLength({ min: 2 }).withMessage("Category name must be at least 2 characters"),
];

export default {
  handleValidationErrors,
  validateRegister,
  validateLogin,
  validateProduct,
  validateOrder,
  validateCategory,
};
