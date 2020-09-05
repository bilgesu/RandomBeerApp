import {Button, Col, Row} from "reactstrap";
import React from "react";

export const HeaderComponent = props => {
    const { title, hasButton, buttonName, style, buttonStyle, buttonClick} = props;

    function handleClick(){
        buttonClick()
    }

    return(
        <Row style={style}>
            <Col md={6} className="initial">
                <h2 className="titleColor">{title}</h2>
            </Col>
            {hasButton ? (<Col md={6} className="center flexEnd">
                <Button className="customizedBtn" style={{buttonStyle}} onClick={() => handleClick()}>{buttonName}</Button>
            </Col>) : null}
        </Row>
    )
};