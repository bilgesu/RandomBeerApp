import React from "react";
import './style.scss';
import {Button, Col} from "reactstrap";
import {Link} from "react-router-dom";


export const TextComponent = props => {

    const {details, title, description, linkProperties, linkName} = props;
    return (
        <div>
            <Col className='textContainerTitle'>{title}</Col>
            <Col className='textContainerDescription'>
                <p>{description}</p>
                {linkProperties ? (
                    <Col className="flexEnd noPaddingRight">
                    <Link to={linkProperties}>{linkName}</Link>
                    </Col>
                ) : null}

            </Col>
            <Col><p>{details}</p></Col>
        </div>
    );
}

