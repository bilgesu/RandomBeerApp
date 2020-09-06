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
        const {breweryDetails, existBreweryId} = this.props;
        if (breweryDetails === null || existBreweryId !== breweryDetails.id) {
            this.props.getBreweryDetails();
        }
    }

    handleBack() {
        this.props.history.goBack();
    }

    closeModal() {
        console.log('closeModal');
        this.props.onChangeField('error', {hasError: false, errorMessage: ''});
        this.props.history.goBack();
    }

    render() {
        const {breweryDetails, isLoading, error} = this.props;
        const context = (
            <Row>
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
                            title={(breweryDetails && breweryDetails.name + ' - ' + breweryDetails.established) || null}
                            description={(breweryDetails && breweryDetails.description) || null}
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

            </Row>
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