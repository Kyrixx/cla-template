import * as React from 'react';
import * as BootstrapModal from 'react-bootstrap/lib/Modal';
import * as BootstrapModalHeader from 'react-bootstrap/lib/ModalHeader'
import * as BootstrapModalTitle from 'react-bootstrap/lib/ModalTitle'
import * as BootstrapModalFooter from 'react-bootstrap/lib/ModalFooter'
import * as BootstrapModalBody from 'react-bootstrap/lib/ModalBody'
import {bindActionCreators} from "redux";
import { connect } from 'react-redux'
import utilsActionCreator from "../../actions/utilsActionCreator";

interface Props {
    hideModal: () => void,
    modalState: boolean,
}

class Modal extends React.Component<Props, any> {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <BootstrapModal show={this.props.modalState} onHide={this.props.hideModal}>
                <BootstrapModalHeader closeButton>
                    <BootstrapModalTitle>Job Classification</BootstrapModalTitle>
                </BootstrapModalHeader>

                <BootstrapModalBody>
                    <span>Le bug a bien été signalé, merci :)</span>
                </BootstrapModalBody>
                <BootstrapModalFooter>
                    <button
                        type="button"
                        onClick={this.props.hideModal}
                        className="btn btn-primary"
                    >Fermer</button>
                </BootstrapModalFooter>
            </BootstrapModal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    modalState: state.utilsReducer.modalState,
});

const mapDispatchToProps = dispatch => ({
    hideModal: bindActionCreators(utilsActionCreator.hideBugSubmitModal, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);