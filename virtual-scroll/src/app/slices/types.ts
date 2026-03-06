// export interface Dimensions {
//   width: number;
//   height: number;
//   depth: number;
// }

// export interface Review {
//   rating: number;
//   comment: string;
//   date: string;
//   reviewerName: string;
//   reviewerEmail: string;
// }

// export interface ProductMeta {
//   createdAt: string;
//   updatedAt: string;
//   barcode: string;
//   qrCode: string;
// }

// export type ProductBasicInfo = {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   brand: string;
//   sku: string;
//   tags: string[];
// };

// export type ProductPricing = {
//   price: number;
//   discountPercentage: number;
//   rating: number;
// };

// export interface ProductInventory {
//   stock: number;
//   availabilityStatus: string;
//   minimumOrderQuantity: number;
//   weight: number;
// }

// export interface ProductPolicies {
//   warrantyInformation: string;
//   shippingInformation: string;
//   returnPolicy: string;
// }

// export interface ProductMedia {
//   thumbnail: string;
//   images: string[];
// }
// export interface Product
//   extends
//     ProductBasicInfo,
//     ProductPricing,
//     ProductInventory,
//     ProductPolicies,
//     ProductMedia {
//   dimensions: Dimensions;
//   reviews: Review[];
//   meta: ProductMeta;
// }



// export interface User {
//   id: number;
//   name: string;
//   company: string;
//   username: string;
//   email: string;
//   address: string;
//   zip: string;
//   state: string;
//   country: string;
//   phone: string;
//   photo: string;
// }

// export interface CartProduct {
//   id: number;
//   title: string;
//   price: number;
//   quantity: number;
//   total: number;
//   discountPercentage: number;
//   discountedTotal: number;
//   thumbnail: string;
// }

// export type CartTotals = {
//   total: number;
//   discountedTotal: number;
//   totalProducts: number;
//   totalQuantity: number;
// };

// export type CartUserInfo = {
//   userId: number;
// };

// export interface Cart extends CartTotals, CartUserInfo {
//   id: number;
//   products: CartProduct[];
// }



export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  phone: string;
  __v: number;
  name: Name;
  address: Address;
}

export interface Name {
  firstname: string;
  lastname: string;
}

export interface Address {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: Geolocation;
}

export interface Geolocation {
  lat: string;
  long: string;
}

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
  __v: number;
}

export interface CartProduct {
  productId: number;
  quantity: number;
}


// export interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   image: string;
//   rating: Rating;
// }

// export interface Rating {
//   rate: number;
//   count: number;
// }


export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}