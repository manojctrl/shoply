import express from "express";
import Product from "../models/Product.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { validateProduct, handleValidationErrors } from "../middleware/validation.js";

const router = express.Router();

// Mock Initial Products for Seeding
const seedProducts = [
  {
    name: "महिला वाइड लेग हाई-राइज",
    brand: "फ्लाइङ मेशिन",
    price: 999.0,
    originalPrice: 1200.0,
    discount: 8,
    rating: 4,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600",
    category: "फेशन",
    subcategory: "महिला",
    additionalInfo: {
      Frame: "Cotton Blend",
      Width: "24\"",
    },
    reviews: [
      { username: "Ram", rating: 4, comment: "उत्पादन राम्रो छ। म सन्तुष्ट छु।" },
      { username: "Sita", rating: 5, comment: "फिटिंग र आराम दुवै राम्रो।" },
    ],
  },
  {
    name: "कलर प्रिन्टेड ड्रेस",
    brand: "#डिभा म्यान्डारिन",
    price: 999.0,
    originalPrice: 1300.0,
    discount: 8,
    rating: 5,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600",
    category: "फेशन",
    subcategory: "महिला",
    additionalInfo: {
      Frame: "Polyester",
      Width: "22\"",
    },
    reviews: [
      { username: "Sita", rating: 5, comment: "रंग र डिजाइन दुवै उत्कृष्ट छ! सिफारिस गर्छु।" },
    ],
  },
  {
    name: "पुरुष ओपेक क्यासुअल शर्ट",
    brand: "क्लाफुटिस",
    price: 785.0,
    originalPrice: 1000.0,
    discount: 10,
    rating: 4,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600",
    category: "फेशन",
    subcategory: "पुरुष",
    additionalInfo: {
      Frame: "Cotton",
      Width: "23\"",
    },
    reviews: [
      { username: "Hari", rating: 4, comment: "आरामदायी छ, तर साइज अलि सानो लाग्यो।" },
    ],
  },
  {
    name: "पुरुष कम्फर्ट क्युबन कलर",
    brand: "क्याम्पस सुत्रा",
    price: 1450.0,
    originalPrice: 1800.0,
    discount: 14,
    rating: 5,
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600",
    category: "फेशन",
    subcategory: "पुरुष",
    additionalInfo: {
      Frame: "Linen Blend",
      Width: "25\"",
    },
    reviews: [
      { username: "Krishna", rating: 5, comment: "गजबको आराम र शैली, किन्न लायक छ।" },
    ],
  },
  {
    name: "पुरुष प्योर कटन स्ट्राइप्ड",
    brand: "एलेन सॉली",
    price: 1800.0,
    originalPrice: 2000.0,
    discount: 10,
    rating: 4,
    image: "https://images.unsplash.com/photo-1588359348347-9bc6cbaa689f?w=600",
    category: "फेशन",
    subcategory: "पुरुष",
    additionalInfo: {
      Frame: "Pure Cotton",
      Width: "24\"",
    },
    reviews: [
      { username: "Gita", rating: 4, comment: "सामग्री राम्रो छ, तर मूल्य अलि धेरै लाग्यो।" },
    ],
  },
  {
    name: "Embroidered Satin Saree",
    brand: "all about you",
    price: 999.0,
    originalPrice: 1200.0,
    discount: 13,
    rating: 5,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600",
    category: "फेशन",
    subcategory: "महिला",
    additionalInfo: {
      Frame: "Satin",
      Width: "20\"",
    },
    reviews: [
      { username: "Laxmi", rating: 5, comment: "धेरै सुन्दर छ, विशेष अवसरको लागि उत्तम।" },
    ],
  },
  {
    name: "कढाइ गरिएको कुर्ती",
    brand: "केसी",
    price: 4785.0,
    originalPrice: 5000.0,
    discount: 12,
    rating: 4,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600",
    category: "फेशन",
    subcategory: "महिला",
    additionalInfo: {
      Frame: "Silk Blend",
      Width: "23\"",
    },
    reviews: [],
  },
  {
    name: "डिजाइनर वेस्टर्न ड्रेस",
    brand: "फ्याशन हब",
    price: 2500.0,
    originalPrice: 3000.0,
    discount: 16,
    rating: 5,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600",
    category: "फेशन",
    subcategory: "महिला",
    additionalInfo: {
      Frame: "Polyester Blend",
      Width: "22\"",
    },
    reviews: [],
  }
];

// @desc    Seed initial database with products
// @route   POST /api/products/seed
// @access  Public
router.post("/seed", async (req, res) => {
  try {
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(seedProducts);
    res.status(201).json({ message: "Products Seeded Successfully", count: createdProducts.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all products (with optional query filters)
// @route   GET /api/products
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } }
      ];
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
router.post("/", protect, admin, validateProduct, handleValidationErrors, async (req, res) => {
  const { name, brand, price, originalPrice, discount, rating, image, category, subcategory, additionalInfo } = req.body;

  try {
    const product = new Product({
      name,
      brand,
      price: price || 0,
      originalPrice: originalPrice || price || 0,
      discount: discount || 0,
      rating: rating || 0,
      image,
      category,
      subcategory,
      additionalInfo: additionalInfo || {},
      reviews: []
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put("/:id", protect, admin, validateProduct, handleValidationErrors, async (req, res) => {
  const { name, brand, price, originalPrice, discount, image, category, subcategory, additionalInfo, countInStock } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.brand = brand || product.brand;
      product.price = price !== undefined ? price : product.price;
      product.originalPrice = originalPrice !== undefined ? originalPrice : product.originalPrice;
      product.discount = discount !== undefined ? discount : product.discount;
      product.image = image || product.image;
      product.category = category || product.category;
      product.subcategory = subcategory || product.subcategory;
      product.additionalInfo = additionalInfo || product.additionalInfo;
      product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a product review
// @route   POST /api/products/:id/reviews
// @access  Private
router.post("/:id/reviews", protect, async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.username === req.user.name
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: "Product already reviewed" });
      }

      const review = {
        username: req.user.name,
        rating: Number(rating),
        comment,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
