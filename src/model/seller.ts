import mongoose, { Document, Schema } from 'mongoose';
import { IDiscount } from './discount';

interface IProduct extends Document {
  productId: string;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  discount: IDiscount['_id'];
  blocked: boolean;
  category: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Product Schema
const ProductSchema: Schema<IProduct> = new Schema({
  productId: { type: String, required: true, unique: true },
  sellerId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  discount: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// BundleProduct Interface
interface IBundleProduct extends Document {
  bundleId: string;
  sellerId: string;
  name: string;
  description?: string;
  products: mongoose.Types.ObjectId[];
  discount?: number;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Bundle Product Schema
const BundleProductSchema = new Schema<IBundleProduct>({
  bundleId: { type: String, required: true, unique: true },
  sellerId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  discount: { type: Number, default: 0 },
  blocked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Sales Report Schema
const SalesReportSchema = new Schema({
  reportId: { type: String, required: true, unique: true },
  sellerId: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  date: { type: Date, required: true, default: Date.now },
  quantitySold: { type: Number, required: true },
  totalRevenue: { type: Number, required: true },
});

interface IAnalyst extends Document{
  analyticsId:string,
  productId: mongoose.Types.ObjectId,
  views: number,
  purchases: number,
  returns:number,
  totalRevenue: number,
  createdAt: Date,
  updatedAt: Date,
}


// Product Analytics Schema
const ProductAnalyticsSchema: Schema<IAnalyst>  = new Schema({
  analyticsId: { type: String, required: true, unique: true },
  productId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  views: { type: Number, default: 0 },
  purchases: { type: Number, default: 0 },
  returns: { type: Number, default: 0 },
  totalRevenue: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model<Document>('Product', ProductSchema, 'Product');
const BundleProduct = mongoose.model<Document>(
  'BundleProduct',
  BundleProductSchema,
  'BundleProduct'
);
const SalesReport = mongoose.model<Document>(
  'SalesReport',
  SalesReportSchema,
  'SalesReport'
);
const ProductAnalytics = mongoose.model<Document>(
  'ProductAnalytics',
  ProductAnalyticsSchema,
  'ProductAnalytics'
);
export {
  IProduct,
  Product,
  BundleProduct,
  IBundleProduct,
  SalesReport,
  IAnalyst,
  ProductAnalytics,
};
