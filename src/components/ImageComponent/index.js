import * as React from "react";
import {Image} from "react-bootstrap";
import './style.scss'

export const ImageComponent = props => {
    const {imageUrl, height, width} = props;
    const defaultUrl = 'https://touch.daft.ie/static/images/fallbacks/no-image-size740x480.jpg';
    return (
        <Image
            style={{maxHeight: height, maxWidth: width, width: '100%', height: '100%'}}
            className='imageContainer'
            src={imageUrl || defaultUrl}
        ></Image>
    );
}
