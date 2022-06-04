import Link from "next/link";
import { urlFor } from "../lib/client";

const FooterBanner = ({ footerData }) => {
  const {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    product,
    buttonText,
    image,
  } = footerData;

  return (
    <section className="footer-banner-container">
      <div className="banner-desc">
        <article className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </article>

        <article className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </article>

        <img
          src={urlFor(image)}
          alt={product}
          className="footer-banner-image"
        />
      </div>
    </section>
  );
};

export default FooterBanner;
