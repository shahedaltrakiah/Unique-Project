function Wishlist(){
    return (
        <div>
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