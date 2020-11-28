import React from 'react';
import LabelItem from '../LabelItem';
class EmailLabels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailNumber : this.props.numberOfSentEmail,
      labels:[]
      
    }
  
  }

  componentDidMount(){
  }
   
    
    render() {
      return (
        <ul className="list-group">
     
          {this.props.labels.map((label) => (
            
              <LabelItem
                key={label.id}
                id={label.id}
                label={label}
                onClick={this.props.onLabelClick}/>
          ))}
        </ul>
      )
    }
  }

  export default EmailLabels;