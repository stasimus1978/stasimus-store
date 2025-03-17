import { Metadata } from "next";

import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";

export const metadata: Metadata = {
  title: "Home Page"
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const HomePage = async () => {
  await delay(1000);

  return (
    <div className="">
      <ProductList data={sampleData.products} title="Latest Arrivals" limit={4} />
    </div>
  );
};

export default HomePage;
