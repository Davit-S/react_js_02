import React, {Component} from 'react';
import Price from './Price';
import Name from './Name'
import Description from './Description'


class Product extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div> <Name name = 'Bananes' /> <Price price="1$"/> <Description description='Fresh bananas from Ecuado' /> </div> 
        )
    }

}


export default Product;