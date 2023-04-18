import Pricing from '@/components/Welcome';

interface Props {
  products: any;
}

export default function PricingPage({ products }: Props) {
  //@ts-ignore
  return <Pricing products={products} />;
}
