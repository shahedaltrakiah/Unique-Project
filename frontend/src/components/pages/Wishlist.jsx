function Wishlist(){
    return (
        <div>
          <div className="wrap-header-cart js-panel-cart">
            <div className="s-full js-hide-cart"></div>
    
            <div className="header-cart flex-col-l p-l-65 p-r-25">
              <div className="header-cart-title flex-w flex-sb-m p-b-8">
                <span className="mtext-103 cl2">Your Cart</span>
                <div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart">
                  <i className="zmdi zmdi-close"></i>
                </div>
              </div>
    
              <div className="header-cart-content flex-w js-pscroll">
                <ul className="header-cart-wrapitem w-full">
                  <li className="header-cart-item flex-w flex-t m-b-12">
                    <div className="header-cart-item-img">
                      <img src="images/item-cart-01.jpg" alt="IMG"/>
                    </div>
                    <div className="header-cart-item-txt p-t-8">
                      <a href="#" className="header-cart-item-name m-b-18 hov-cl1 trans-04">
                        White Shirt Pleat
                      </a>
                      <span className="header-cart-item-info">1 x $19.00</span>
                    </div>
                  </li>
                  <li className="header-cart-item flex-w flex-t m-b-12">
                    <div className="header-cart-item-img">
                      <img src="images/item-cart-02.jpg" alt="IMG"/>
                    </div>
                    <div className="header-cart-item-txt p-t-8">
                      <a href="#" className="header-cart-item-name m-b-18 hov-cl1 trans-04">
                        Converse All Star
                      </a>
                      <span className="header-cart-item-info">1 x $39.00</span>
                    </div>
                  </li>
                  <li className="header-cart-item flex-w flex-t m-b-12">
                    <div className="header-cart-item-img">
                      <img src="images/item-cart-03.jpg" alt="IMG"/>
                    </div>
                    <div className="header-cart-item-txt p-t-8">
                      <a href="#" className="header-cart-item-name m-b-18 hov-cl1 trans-04">
                        Nixon Porter Leather
                      </a>
                      <span className="header-cart-item-info">1 x $17.00</span>
                    </div>
                  </li>
                </ul>
    
               
              </div>
            </div>
          </div>
    
          {/*breadcrumb */}
          <div className="container">
            <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
              <a href="index.html" className="stext-109 cl8 hov-cl1 trans-04">
                Home
                <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
              </a>
              <span className="stext-109 cl4">Wishlist</span>
            </div>
          </div>
    
          {/*Shopping Cart */}
          <form className="bg0 p-t-75 p-b-85">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 m-lr-auto m-b-50">
                  <div className="m-l-25 m-r--38 m-lr-0-xl">
                    <div className="wrap-table-shopping-cart">
                      <table className="table-shopping-cart">
                        <thead>
                          <tr className="table_head">
                            <th className="column-1">Product Image</th>
                            <th className="column-2">Product Name</th>
                            <th className="column-3">Unit Price</th>
                            <th className="column-4">Add</th>
                            <th className="column-5">Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="table_row">
                            <td className="column-1">
                              <div className="how-itemcart1">
                                <img src="images/item-cart-04.jpg" alt="IMG"/>
                              </div>
                            </td>
                            <td className="column-2">Zara</td>
                            <td className="column-3">$36.00</td>
                            <td className="column-4">
                              <button className="btn-add-to-cart">Add to Cart</button>
                            </td>
                            <td className="column-5">
                              <button className="btn-remove">
                                <i className="fa fa-times"></i>
                              </button>
                            </td>
                          </tr>
                          <tr className="table_row">
                            <td className="column-1">
                              <div className="how-itemcart1">
                                <img src="images/item-cart-05.jpg" alt="IMG"/>
                              </div>
                            </td>
                            <td className="column-2">Converse</td>
                            <td className="column-3">$16.00</td>
                            <td className="column-4">
                              <button className="btn-add-to-cart">Add to Cart</button>
                            </td>
                            <td className="column-5">
                              <button className="btn-remove">
                                <i className="fa fa-times"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
    
                    <div className="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                      <div className="flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5">
                        Clear Wishlist 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    }
    export default Wishlist