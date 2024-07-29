import mongoose, { Document, Schema } from 'mongoose';

// Product Schema
const ProductSchema = new Schema({
  productId: { type: String, required: true, unique: true },
  sellerId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Bundle Product Schema
const BundleProductSchema = new Schema({
  bundleId: { type: String, required: true, unique: true },
  sellerId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  products: [{ type: String, ref: 'Product' }],
  discount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Sales Report Schema
const SalesReportSchema = new Schema({
  reportId: { type: String, required: true, unique: true },
  sellerId: { type: String, required: true },
  productId: { type: String, required: true, ref: 'Product' },
  date: { type: Date, required: true },
  quantitySold: { type: Number, required: true },
  totalRevenue: { type: Number, required: true }
});

// Product Analytics Schema
const ProductAnalyticsSchema = new Schema({
  analyticsId: { type: String, required: true, unique: true },
  productId: { type: String, required: true, ref: 'Product' },
  views: { type: Number, default: 0 },
  purchases: { type: Number, default: 0 },
  returns: { type: Number, default: 0 }
});


const Product = mongoose.model<Document>('Product', ProductSchema,'Product');
const BundleProduct = mongoose.model<Document>('BundleProduct', BundleProductSchema,'BundleProduct');
const SalesReport = mongoose.model<Document>('SalesReport', SalesReportSchema,'SalesReport');
const ProductAnalytics = mongoose.model<Document>('ProductAnalytics', ProductAnalyticsSchema,'ProductAnalytics');
export { Product, BundleProduct, SalesReport, ProductAnalytics };
