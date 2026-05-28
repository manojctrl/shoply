import express from "express";
import Category from "../models/Category.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Seed initial categories
const initialCategories = [
  { name: "फेशन", subcategories: ["महिला", "पुरुष", "बच्चा"] },
  { name: "विद्युत सामग्रीहरू", subcategories: ["मोबाइल", "ल्यापटप", "एक्सेसरिज"] },
  { name: "खुट्टाका जुत्ता", subcategories: ["क्याजुअल", "स्पोर्ट्स", "पार्टी"] },
  { name: "किराना सामान", subcategories: ["दाल", "चामल", "तेल"] },
  { name: "सौन्दर्य", subcategories: ["मेकअप", "स्किनकेयर"] },
  { name: "स्वास्थ्य", subcategories: ["भिटामिन", "सप्लीमेन्ट"] },
  { name: "गहना", subcategories: ["सुन", "चाँदी"] }
];

// @desc    Seed categories
// @route   POST /api/categories/seed
// @access  Public
router.post("/seed", async (req, res) => {
  try {
    await Category.deleteMany({});
    const created = await Category.insertMany(initialCategories);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create new main category
// @route   POST /api/categories
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  const { name, subcategories } = req.body;
  try {
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const category = await Category.create({ name, subcategories: subcategories || [] });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Add subcategory to existing category
// @route   POST /api/categories/:id/subcategories
// @access  Private/Admin
router.post("/:id/subcategories", protect, admin, async (req, res) => {
  const { subcategory } = req.body;
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      if (category.subcategories.includes(subcategory)) {
        return res.status(400).json({ message: "Subcategory already exists" });
      }
      category.subcategories.push(subcategory);
      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
