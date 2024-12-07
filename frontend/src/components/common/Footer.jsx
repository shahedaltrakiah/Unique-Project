function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className="bg3 p-t-75 p-b-32">
        <div className="container">
          <div className="row p-r-50">
            <div className="col-sm-6 col-lg-3 p-b-50 p-r-140">
              <h4 className="stext-301 cl0 p-b-30">Categories</h4>
              <ul>
                <li className="p-b-10">
                  <a href="/" className="stext-107 cl7 hov-cl1 trans-04">
                    Home
                  </a>
                </li>
                <li className="p-b-10">
                  <a href="/shop" className="stext-107 cl7 hov-cl1 trans-04">
                    Shop
                  </a>
                </li>
                <li className="p-b-10">
                  <a href="/sell" className="stext-107 cl7 hov-cl1 trans-04">
                    Sell
                  </a>
                </li>
                <li className="p-b-10">
                  <a href="#" className="stext-107 cl7 hov-cl1 trans-04">
                    Watches
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 col-lg-3 p-b-50">
              <h4 className="stext-301 cl0 p-b-30">Help</h4>
              <ul>
                <li className="p-b-10">
                  <a href="#" className="stext-107 cl7 hov-cl1 trans-04">
                    Track Order
                  </a>
                </li>
                <li className="p-b-10">
                  <a href="#" className="stext-107 cl7 hov-cl1 trans-04">
                    Returns
                  </a>
                </li>
                <li className="p-b-10">
                  <a href="#" className="stext-107 cl7 hov-cl1 trans-04">
                    Shipping
                  </a>
                </li>
                <li className="p-b-10">
                  <a href="#" className="stext-107 cl7 hov-cl1 trans-04">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 col-lg-3 p-b-50">
              <h4 className="stext-301 cl0 p-b-30">Newsletter</h4>
              <form>
                <div className="wrap-input1 w-full p-b-4">
                  <input
                    className="input1 bg-none plh1 stext-107 cl7"
                    type="text"
                    name="email"
                    placeholder="email@example.com"
                  />
                  <div className="focus-input1 trans-04" />
                </div>
                <div className="p-t-18">
                  <button className="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
            <div className="col-sm-6 col-lg-3 p-b-50 p-l-20">
              <img
                src="public/assets/images/logo.png"
                alt="Login Illustration"
                style={{ maxWidth: "250px" , marginTop:'60px'}}
              />{" "}
            </div>
          </div>
          <div className="p-t-40">
            <p className="stext-107 cl6 txt-center">
              Copyright - 2024 © All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
