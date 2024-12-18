import ProductPage from "@/components/ProductPage";
import ProductService from "@/lib/product";
import { Metadata } from "next";

enum Size {
  L = "L",
  M = "M",
  SM = "SM",
  XL = "XL",
  XXL = "XXL",
}

interface Product {
  $id?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  sizesAvailable: Size[];
  itemsCount: number;
  category?: string;
  images?: string[];
  createdAt?: string;
}

// Define the page component props using Next.js types
export interface GenerateMetadataProps {
  params: { productid: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Server-side component rendering the product
export default async function ProductPageContainer({
  params,
}: {
  params: { productid: string };
}) {
  const { productid } = await params;

  const product = await ProductService.getProduct(productid);

  if (!product) {
    return (
      <p className="text-center text-lg font-medium text-red-500">
        Product not found.
      </p>
    );
  }

  return (
    <div className="mt-10 ">
      <ProductPage product={product as any} />
    </div>
  );
}

// Generate metadata dynamically for SEO
export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { productid } = await params;
  const product = await ProductService.getProduct(productid);

  if (!product) {
    return {
      title: "Product not found",
      description: "The product you are looking for does not exist.",
    };
  }

  return {
    title: product.name,
    description: product.description,
    keywords: product.category ? [product.category] : undefined,
    openGraph: {
      images: product?.images || [],
    },
  };
}

// Generate static parameters for dynamic routes
export async function generateStaticParams() {
  const products = await ProductService.getProducts();

  return products.products.map((product: Product) => ({
    productid: product.id,
  }));
}
