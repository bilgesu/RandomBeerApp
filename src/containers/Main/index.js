import React from "react";
import './style.scss';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {Col, Row} from "reactstrap";
import {HeaderComponent} from "../../components/HeaderComponent";
import {BeerDetails} from "../BeerDetails";
import * as PropTypes from "prop-types";
import {selectBeerDetails, selectError, selectIsLoading} from "../../store/selector";
import {getBeerDetails, onChangeField} from "../../store/action/action";
import {LayoutComponent} from "../../components/LayoutComponent/layout";


class Main extends React.Component {

    handleClick() {
        this.props.getBeerDetails();
    }

    componentDidMount() {
        const {beerDetails} = this.props;
        if (beerDetails === null) {
            this.props.getBeerDetails();
        }
    }

    render() {
        const {beerDetails, error, isLoading} = this.props;
        const context = (
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
                <BeerDetails
                    beerDetails={beerDetails}
                />
            </Row>
        );
        return (
            <LayoutComponent
                isLoading={isLoading}
                context={context}
                error={error}
                closeModal={() => this.props.onChangeField('error', {hasError: false, errorMessage: ''})}
            />
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