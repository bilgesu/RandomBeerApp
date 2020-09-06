
import React from "react";
import './style.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {Col, Modal, ModalHeader, Row} from "reactstrap";
import LoadingOverlay from 'react-loading-overlay';
import { HeaderComponent } from "../../components/HeaderComponent";
import {BeerDetails} from "../BeerDetails";
import * as PropTypes from "prop-types";
import {selectBeerDetails, selectError, selectIsLoading} from "../../store/selector";
import {getBeerDetails, onChangeField} from "../../store/action/action";


class Main extends React.Component {

    handleClick() {
        //setLoading(true);
        this.props.getBeerDetails();
    }

    componentDidMount(){
        const {beerDetails} = this.props;
        if(beerDetails === null) {
            this.props.getBeerDetails();
        }
    }

    render(){
        const {beerDetails, error} = this.props;
        return (
            <LoadingOverlay
                active={this.props.isLoading}
                spinner
                text='Loading details...'
                className="wrapper"
            >
                <div className="containerWrap">
                    <Col md={8}>
                        <Row>
                            <Col md={12} className='titleContainer'>
                                <HeaderComponent
                                    title="The Random Beer App"
                                    hasButton
                                    buttonClick={() => this.handleClick()}
                                    buttonName="Show Another Beer"
                                    buttonStyle="customizedBtn"
                                />
                            </Col>
                        </Row>
                        <BeerDetails
                            beerDetails={beerDetails}
                            />
                    </Col>

                </div>
                <Modal
                isOpen={error.hasError || false}
            >
                <ModalHeader
                    toggle={() => this.props.onChangeField('error', {hasError: false, errorMessage: ''})}
                >{error.errorMessage}</ModalHeader>
            </Modal>

            </LoadingOverlay>
        )
    }
}
Main.propTypes = {
    isLoading: PropTypes.bool,
    beerDetails: PropTypes.object,
    getBeerDetails: PropTypes.func,
    error: PropTypes.object,
    onChangeField: PropTypes.func,
};
const mapDispatchToProps = (dispatch) => ({
    getBeerDetails: () => dispatch(getBeerDetails()),
    onChangeField: (field, value) => dispatch(onChangeField(field, value))
});

const mapStateToProps = createStructuredSelector({
    beerDetails: selectBeerDetails(),
    isLoading: selectIsLoading(),
    error: selectError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);