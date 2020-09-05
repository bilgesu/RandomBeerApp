import React from "react";
import './style.scss';
import {Button, Col} from "reactstrap";
import {Link} from "react-router-dom";


export const TextComponent = props => {

    const {details, title, description, linkProperties, linkName} = props;
    return (
        <div>
            <Col className='textContainerTitle'>{title}</Col>
            <Col className='textContainerDescription'>{description}</Col>
            <Col><p>{details}</p></Col>
            {linkProperties ? (<Col md={12} className="flexEnd noPaddingRight"><Button className="customizedBtn"><Link style={{color: '#ffffff'}} to={linkProperties}>{linkName}</Link></Button></Col>) : null}
        </div>
    );
}

