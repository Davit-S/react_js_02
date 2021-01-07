import React, {Component} from 'react';

class Description extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(<span>{this.props.description}</span>)
    }
}


export default Description;