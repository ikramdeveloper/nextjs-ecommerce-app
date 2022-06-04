import Link from "next/link";

const Canceled = () => {
  return (
    <section className="success-wrapper">
      <div className="success">
        <h2>You canceled the order</h2>
        <Link href="/">
          <button className="btn" type="button" width="300px">
            Go back to home page
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Canceled;
