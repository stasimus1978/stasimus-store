import { notFound } from "next/navigation";

import { getProductBySlug } from "@/lib/actions/product.actions";

type Props = { params: Promise<{ slug: string }> };
const ProductDetailsPage = async (props: Props) => {
  const { slug } = await props.params;

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return <>{product.name}</>;
};

export default ProductDetailsPage;
