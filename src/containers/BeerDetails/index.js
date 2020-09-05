import React from "react";
import * as PropTypes from "prop-types";
import {Col, Row} from "reactstrap";
import '../Main/style.scss'
import {TextComponent} from "../../components/TextComponent";
import {ImageComponent } from "../../components/ImageComponent";

export class BeerDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {beerDetails} = this.props;
        return (
            <Row className="containerWrap">
                <Col md={4} className='imageContainer'>
                    <ImageComponent
                        width='250px'
                        height='150px'
                        imageUrl={beerDetails ? beerDetails.label || null : null}
                    />
                </Col>
                <Col md={8}>
                    <TextComponent
                        title={beerDetails ? beerDetails.nameDisplay : ''}
                        description={beerDetails && beerDetails.style ? beerDetails.style.description : 'Description is not found'}
                        linkProperties={{
                            pathname: '/breweryDetails',
                        }}
                        linkName='Brewery Details'/>

                </Col>
            </Row>
        )
    }
}

BeerDetails.propTypes = {
    beerDetails: PropTypes.object,
}