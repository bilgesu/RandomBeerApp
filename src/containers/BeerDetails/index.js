import React from "react";
import * as PropTypes from "prop-types";
import {Col, Row} from "reactstrap";
import '../Main/style.scss'
import {TextComponent} from "../../components/TextComponent";
import {ImageComponent } from "../../components/ImageComponent";

export class BeerDetails extends React.Component {

    render() {
        const {beerDetails} = this.props;
        return (
            <Row className="containerWrap">
                <Col md={4} className='imageContainer'>
                    {/* the labels of beers are shown here */}
                    <ImageComponent
                        imageUrl={(beerDetails && beerDetails.label) || null}
                        height="100%"
                        width="100%"
                    />
                </Col>
                <Col md={8}>
                    {/*Beer Details are shown*/}
                    <TextComponent
                        title={beerDetails ? beerDetails.nameDisplay : ''}
                        description={beerDetails && beerDetails.style ? beerDetails.style.description : 'Description is not found'}
                        linkProperties={{
                            pathname: '/breweryDetails',
                        }}
                        linkName={beerDetails && beerDetails.breweries[0].name}/>

                </Col>
            </Row>
        )
    }
}

BeerDetails.propTypes = {
    beerDetails: PropTypes.object,
}