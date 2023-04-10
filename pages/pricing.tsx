import Pricing from '@/components/welcome';

interface Props {
  products: any;
}

export default function PricingPage({products}: Props) {
  return <Pricing products={products} />;
}