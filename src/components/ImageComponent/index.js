
import * as React from "react";
import {Image} from "react-bootstrap";
import './style.scss'

export const  ImageComponent = props => {
    const { imageUrl, height, width } = props;
    const defaultUrl = 'https://touch.daft.ie/static/images/fallbacks/no-image-size740x480.jpg';
    return (<Image
        className='imageContainer'
        height={height}
        width={width}
        src={imageUrl || defaultUrl}
    ></Image>);
}
