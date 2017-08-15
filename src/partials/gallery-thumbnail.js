import React from 'react';
import ReactDOM from "react-dom";

export default class GalleryThumbnail extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            left: 0
        };
    }

    render(){   
        return( 
            <div ref="thumb" className="gallery-thumbnail" style = { this.props.style } onClick={this.props.onClick} >
                <img src={this.props.url} />
            </div>
        )
    }
}