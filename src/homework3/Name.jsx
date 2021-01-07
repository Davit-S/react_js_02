import React, {Component} from 'react';

class Name extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(<span>{this.props.name}</span>)
    }
}


export default Name;