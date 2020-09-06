import React from "react";
import {Col, Row} from "reactstrap";
import GoogleMapReact from 'google-map-react';
import {GOOGLE_API_KEY} from "../../store/constants";
import './style.scss';

export const MapComponent = props => {
    const {address, center} = props;
    return (
        <Row>
            <Col md={8}>
            <Row>
                <Col md={12} className="address">{address}</Col>
            </Row>
            <Row className="mapItem">
                <Col style={{margin: '10px'}}><GoogleMapReact
                    bootstrapURLKeys={{
                        key: GOOGLE_API_KEY,
                        language: "en",
                        region: "US"
                    }}
                    defaultCenter={center}
                    defaultZoom={15}
                    yesIWantToUseGoogleMapApiInternals
                >

                </GoogleMapReact></Col>
            </Row>
            </Col>
        </Row>
    )

};
