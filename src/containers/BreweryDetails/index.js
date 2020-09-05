import React from "react";
import {Button, Col, Modal, ModalHeader, Row} from "reactstrap";
import '../Main/style.scss'
import LoadingOverlay from "react-loading-overlay";
import {TextComponent} from "../../components/TextComponent";
import {Map} from "../../components/Map";
import {HeaderComponent} from "../../components/HeaderComponent";
import {ImageComponent} from "../../components/ImageComponent";
import * as PropTypes from "prop-types";
import {createStructuredSelector} from "reselect";
import {selectBreweryDetails, selectBreweryId, selectError, selectIsLoading} from "../../store/selector";
import connect from "react-redux/es/connect/connect";
import {getBreweryDetails, onChangeField} from "../../store/action/action";

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

    closeModal(){
        this.props.onChangeField('error', {hasError: false, errorMessage: ''});
        this.props.history.goBack();
    }

    render() {
        const {breweryDetails, isLoading, error} = this.props;
        return (
            <LoadingOverlay
                active={isLoading}
                spinner
                text='Loading details...'
            >
                <Row className="banner"></Row>
                <Row className="containerWrap">
                    <Col md={8}>
                        <Row>
                            <Button className="customizedBtn" onClick={() => this.handleBack()}>Back</Button>
                            <Col md={12} className="containerWrap">
                                <Row>
                                    <Col md={4} className='imageContainer'>
                                        <ImageComponent
                                            width='250px'
                                            height='150px'
                                            imageUrl={breweryDetails && breweryDetails.images && breweryDetails.images.medium || null}
                                        />
                                    </Col>
                                    <Col md={8}>
                                        <TextComponent
                                            title={breweryDetails && breweryDetails.name || null}
                                            description={breweryDetails && breweryDetails.description || null}
                                        />
                                        <Row>
                                            <Col md={12}><h4>Locations</h4></Col>
                                            {breweryDetails && breweryDetails.locations && breweryDetails.locations.map((item) => {
                                                return (<Map
                                                    key={item.id}
                                                    address={item.streetAddress + ' ' + item.postalCode + ' ' + item.country.displayName}
                                                    createDate={item.createDate}
                                                    center={{lat: item.latitude, lng: item.longitude}}
                                                />)
                                            })}
                                        </Row>
                                    </Col>
                                    <Col md={12}>

                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Modal
                    isOpen={error.hasError || false}
                >
                    <ModalHeader
                        toggle={() => this.closeModal()}
                    >{error.errorMessage}</ModalHeader>
                </Modal>
            </LoadingOverlay>
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