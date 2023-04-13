import Pricing from '@/components/Welcome';

interface Props {
  products: any;
}

export default function PricingPage({ products }: Props) {
  return <Pricing products={products} />;
}
