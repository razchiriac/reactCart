import React, { Component } from 'react';
import Item from './Item';
import _ from '../../bower_components/underscore/underscore';

export default class List extends Component {
	renderItems() {
		const props = _.omit(this.props, 'items');
		
		return _.map(this.props.items, (item, index) => <Item key={index} {...item} {...props} />);
	}	
	
	render(){
	  return (
	    <tbody>
				{this.renderItems()}
	    </tbody>
	  );
	}
}