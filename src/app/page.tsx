import Topheader from "./components/Topheader/page";
import Hero from "./components/Hero/page";
import Editors from "./components/editorspick/page";
import Classman from "./components/Classman/page";

import Products from "./components/products-Card/page";
import Universe from "./components/Universe/page";
import FuturePost from "./components/Futured/page";

import Furniture from "./components/Furniture/page";

import Stitching from "./components/stitching/page";
import ProductDetail from './product/[id]/page';

export default function Home() {
  const currentProductTags = ['tag1', 'tag2']; // Example tags

  return (
    <>
      
     
      <Hero />
      <Furniture />
      <Stitching />
   
      <Editors />
      <Products />
      <Classman />
      <Universe />
      <FuturePost />
      <ProductDetail params={{ id: 'some-product-id' }} currentProductTags={currentProductTags} />
      
    </>
  );
}
