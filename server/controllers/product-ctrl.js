import Product from "../models/product-model.js";
import ApiFeatures from "../utils/api-features.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    req.body.userId = req.user._id;

    const product = await Product.create(req.body);
    if (!product) {
      return res.status(400).send("product is not added!");
    }
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (!updateProduct) {
      return res.status(400).send("product is not updated!");
    }
    res.status(200).send(updatedProduct);
  } catch (error) {
    console.log(error);
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(400).send("product is not deleted!");
    }
    res.status(200).send("product is deleted!");
  } catch (error) {
    console.log(error);
  }
};

// GET A PRODUCT
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).send("product is not found!");
    }
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
  }
};

//   // GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    const productPerPage = 6;
    const totalProduct = await Product.countDocuments();
    const features = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(productPerPage);

    let products = await features.query;

    if (!products) {
      return res.status(400).send("products are not found!");
    }
    res.status(200).send({ products, totalProduct });
  } catch (error) {
    console.log(error);
  }
};

// CREATE AND UPDATE THE REVIEW
export const createAndUpdateReview = async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;

    const review = {
      userId: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
      (rev) => rev.userId.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.userId.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let sum = 0;

    product.reviews.forEach((rev) => {
      sum += rev.rating;
    });

    // ratings = average
    product.ratings = sum / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).send(product);
  } catch (error) {
    console.log(error);
  }
};

// GET ALL REVIEWS
export const getAllReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return res.status(400).send("Product not found");
    }
    res.status(200).send(product.reviews);
  } catch (error) {
    console.log(error);
  }
};

// DELETE REVIEW
export const deleteReview = async (req, res) => {
  try {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return res.status(400).send("Product not found");
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let sum = 0;

    reviews.forEach((rev) => {
      sum += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = sum / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
      }
    );

    res.status(200).send(product);
  } catch (error) {
    console.log(error);
  }
};
