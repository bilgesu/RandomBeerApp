import React from "react";
import {Col} from "reactstrap";
import GoogleMapReact from 'google-map-react';
import {GOOGLE_API_KEY} from "../../store/constants";

export const Map = props => {
    const {address, createDate, center } = props;
        return(
            <div>
                <Col>{`Create Date: ${new Date(createDate).toLocaleDateString()}`}</Col>
                <Col>{address}</Col>
                {<Col style={{ height: '200px', width: '350px', margin: '15px' }}><GoogleMapReact
                    bootstrapURLKeys={{
                        key: GOOGLE_API_KEY,
                        language: "en",
                        region: "US"
                    }}
                    defaultCenter={center}
                    defaultZoom={15}
                    yesIWantToUseGoogleMapApiInternals
                >

                </GoogleMapReact></Col>}
            </div>
        )

};
