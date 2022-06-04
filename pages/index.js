import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, banner }) => {
  return (
    <>
      <HeroBanner bannerData={banner.length && banner[0]} />

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {products?.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>

      <FooterBanner footerData={banner.length && banner[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const productQuery = `*[_type == 'product']`;
  const products = await client.fetch(productQuery);

  const bannerQuery = `*[_type == 'banner']`;
  const banner = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      banner,
    },
  };
};

export default Home;
