import React, {Component} from 'react';

class Price extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: props.price
        };
    }

    changeTheCurrency = () => {
        if(this.state.value === '1$'){
            
            this.setState({
                value: '500֏'
            });
        }
        else{
            this.setState({
                value: this.props.price
            });
        }

         
    };


    render(){
        return (<div> <span> {this.state.value} </span>
        <button onClick={this.changeTheCurrency}>Change the currency</button> </div>
        )
    }


}

export default Price;
