import React, { Component } from 'react';
import List from './components/List';
import items from './items';
import _ from '../bower_components/underscore/underscore';
import '../bower_components/bootstrap/dist/css/bootstrap.min.css';
import '../bower_components/bootstrap/dist/css/bootstrap-grid.min.css';
import './Cart.css';

export default class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: items,
			qtyTotal: 0,
			priceTotal: 0,
			subTotal: 0,
			tax: 0.10,
			grandTotal: 0
    };
	}
	
	componentDidMount(){
		this.handleSubTotal();
	}
	
	changeQty(itemId,qty) {
		var item = _.find(this.state.items, item => item.id === itemId );
		item.quantity = qty;
		
		this.setState({ qtyTotal: this.state.qtyTotal + item.quantity });
		this.setState({ priceTotal: this.state.priceTotal + item.price });
		
		this.handleSubTotal();
	}		
	
	removeItem(itemId) {
		var items = _.without(this.state.items, _.findWhere(this.state.items, {
		  id: itemId
		}));
		this.setState({ items: items });		
		this.handleSubTotal();
	}
	
	handleSubTotal = (itemTotal = 0) => {	
		_.each(this.state.items, function(item){
			itemTotal += item.price * item.quantity;
		});

		this.setState({ subTotal: itemTotal });
		this.handleGrandTotal(itemTotal);
	}
	
	handleGrandTotal(subTotal) {
		this.setState({grandTotal: ( this.state.tax * subTotal ) + subTotal });
	}

  render() {
    return (
			<div className="Cart">
				<div className="container">
					<header className="cart-header">
						<strong>React</strong>Cart
						<div className="text-muted">ECMAScript 6</div>
					</header>
					<div className="card container">
					  <div className="row">
					    <div className="">
					      <table className="table table-hover">
									<thead>
										<tr>
											<th>Product</th>
											<th>Quantity</th>
											<th className="text-center">Price</th>
											<th className="text-center">Total</th>
											<th> </th>
										</tr>
									</thead>
									
									<List 
										items={this.state.items} 
										removeItem={this.removeItem.bind(this)}
										changeQty={this.changeQty.bind(this)}
										handleSubTotal={this.handleSubTotal.bind(this)}
									/>

									<tfoot>
										<tr>
											<td></td>
											<td></td>
											<td></td>
											<td>
												<h5>Subtotal:</h5></td>
											<td className="text-right">
												<h5><strong>${this.state.subTotal.toFixed(2)}</strong></h5></td>
										</tr>
										<tr>
											<td></td>
											<td></td>
											<td></td>
											<td>
												<h5>Tax</h5></td>
											<td className="text-right">
												<h5><strong>10%</strong></h5></td>
										</tr>
										<tr>
											<td></td>
											<td></td>
											<td></td>
											<td>
												<h3>Total</h3></td>
											<td className="text-right">
												<h3><strong>${this.state.grandTotal.toFixed(2)}</strong></h3></td>
										</tr>
										<tr>
											<td></td>
											<td></td>
											<td></td>
											<td>
												<button disabled type="button" className="btn btn-default">
	                        <span className="glyphicon glyphicon-shopping-cart"></span> Continue Shopping
	                      </button></td>
											<td>
												<button disabled type="button" className="btn btn-success">
	                        Checkout <span className="glyphicon glyphicon-play"></span>
	                      </button></td>
										</tr>									
									</tfoot>
								</table>
							</div>
						</div>
					</div>
					<br/>
					<div className="text-center">
						<a className="text-muted" href="https://github.com/abudayah/reactCart">github</a>
					</div>
					<br/>
					<br/>
	      </div>
      </div>

    );
  }
}

