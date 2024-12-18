import type { MetadataRoute } from "next";
import ProductService from "@/lib/product";
import CategoryService from "@/lib/category";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productsResponse = await ProductService.getProducts();
  const products = productsResponse.products;
  
  const categoriesResponse = await CategoryService.getCategories();
 
  const categoryUrls = categoriesResponse.map((category) => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}/category/${category.name}`,
    lastModified: category.createdAt ? new Date(category.createdAt).toISOString() : new Date().toISOString(),
    changefreq: "daily", 
    priority: 0.7
  }));

  const productUrls = products.map((product) => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}/product/${product.id}`,
    lastModified: product.createdAt ? new Date(product.createdAt).toISOString() : new Date().toISOString(),
    changefreq: "daily",
    priority: 0.7
  }));

  const sitemapEntries = [...productUrls, ...categoryUrls];

  return sitemapEntries;
}
