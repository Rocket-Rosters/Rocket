import Pricing from '@/components/Welcome';
import React from 'react';
import YouTube from 'react-youtube';

interface Props {
  products: any;
}

export default function PricingPage({ products }: Props) {
  const videoId = 'iq0DxiEYLbQ';

  return (
    <>
      <div>
        <YouTube videoId={videoId} />
      </div>
      {/* @ts-ignore */}
      <Pricing products={products} />
    </>
  );
}
