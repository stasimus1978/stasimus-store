import { Metadata } from "next";

import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

export const metadata: Metadata = {
  title: "Home Page"
};

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const HomePage = async () => {
  // await delay(1000);
  const latestProducts = await getLatestProducts();

  return (
    <div className="">
      <ProductList data={latestProducts} title="Latest Arrivals" />
    </div>
  );
};

export default HomePage;
