import React from "react";
import {Button, Col, Row} from "reactstrap";
import '../Main/style.scss'
import {TextComponent} from "../../components/TextComponent";
import {MapComponent} from "../../components/MapComponent";
import {ImageComponent} from "../../components/ImageComponent";
import * as PropTypes from "prop-types";
import {createStructuredSelector} from "reselect";
import {selectBreweryDetails, selectBreweryId, selectError, selectIsLoading} from "../../store/selector";
import connect from "react-redux/es/connect/connect";
import {getBreweryDetails, onChangeField} from "../../store/action/action";
import {LayoutComponent} from "../../components/LayoutComponent/layout";

class BreweryDetails extends React.Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
    }

    componentDidMount() {

        // If there is no brewery id, new api call is requested
        // The brewery id check with previous brewery id
        // If they are different, new api call is requested
        // If they are the same, previous data is shown
        // The aim is avoid to unnecessary api call
        const {breweryDetails, existBreweryId} = this.props;
        if (breweryDetails === null || existBreweryId !== breweryDetails.id) {
            this.props.getBreweryDetails();
        }
    }

    handleBack() {
        // go back to the previous page
        this.props.history.goBack();
    }

    closeModal() {
        // When the modal is closed, the page go back to the previous page
        this.props.onChangeField('error', {hasError: false, errorMessage: ''});
        this.props.history.goBack();
    }

    render() {
        const {breweryDetails, isLoading, error} = this.props;
        const context = (
            <div>
                <Row>
                    <Col md={12} className="initial">
                        {/* Go back previous page */}
                        <Button className="customizedBtn" onClick={() => this.handleBack()}>Back</Button>
                    </Col>
                </Row>
                <Row className="containerWrap">
                    <Col md={4} className='imageContainer'>
                        {/* Brewery Label is shown */}
                        <ImageComponent
                            width='100%'
                            height='100%'
                            imageUrl={(breweryDetails && breweryDetails.images && breweryDetails.images.medium) || null}
                        />
                    </Col>
                    <Col md={8}>
                        {/* Brewery details is shown */}
                        <TextComponent
                            title={(breweryDetails && breweryDetails.name + ' - ' + breweryDetails.established) || ''}
                            description={(breweryDetails && breweryDetails.description) || 'Description is not found'}
                        />
                        <div>
                            {/* If brewery has locations, they are shown */}
                            <Col md={12} className="flexCenter"><h4>Locations</h4></Col>
                            {breweryDetails && breweryDetails.locations && breweryDetails.locations.map((item) => {
                                return (<MapComponent
                                    key={item.id}
                                    address={item.streetAddress + ' ' + item.postalCode + ' ' + item.country.displayName}
                                    center={{lat: item.latitude, lng: item.longitude}}
                                />)
                            })}

                        </div>
                    </Col>
                </Row>

            </div>
        );
        return (
            <LayoutComponent
                isLoading={isLoading}
                context={context}
                error={error}
                closeModal={() => this.closeModal()}
            />
        )
    }
}

BreweryDetails.propTypes = {
    isLoading: PropTypes.bool,
    breweryDetails: PropTypes.object,
    getBreweryDetails: PropTypes.func,
    existBreweryId: PropTypes.string,
    error: PropTypes.object,
    onChangeField: PropTypes.func,
};
const mapDispatchToProps = (dispatch) => ({
    getBreweryDetails: () => dispatch(getBreweryDetails()),
    onChangeField: (field, value) => dispatch(onChangeField(field, value))
});

const mapStateToProps = createStructuredSelector({
    breweryDetails: selectBreweryDetails(),
    isLoading: selectIsLoading(),
    existBreweryId: selectBreweryId(),
    error: selectError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(BreweryDetails);