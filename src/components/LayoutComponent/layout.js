import LoadingOverlay from "react-loading-overlay";
import {Col, Modal, ModalHeader, Row} from "reactstrap";
import React from "react";
import '../../containers/Main/style.scss';
export const LayoutComponent = props => {
    {/* The Layout for pages contexts */}
    const { error, context, closeModal, isLoading} = props;
    return(
        <LoadingOverlay
            active={isLoading}
            spinner
            text='Loading details...'
            className="wrapper"
        >

            <Row className="banner"></Row>
            <div className="containerWrap">
                <Col md={8}>
                        {context}
                </Col>
            </div>
            <Modal
                isOpen={error.hasError || false}
            >
                <ModalHeader
                    toggle={() => closeModal()}
                >{error.errorMessage}</ModalHeader>
            </Modal>
        </LoadingOverlay>
)
}
