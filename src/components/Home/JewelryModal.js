import React from "react";
import Modal from "react-modal";
import "./Home.css"
import {withErrorBoundary} from "react-error-boundary";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

Modal.setAppElement("#root");

class JewelryModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            jewelry: {},
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(jewelry) {
        this.setState({ modalIsOpen: true, jewelry: jewelry });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <div>

                <div
                    className="jewelry-card"
                    onClick={() => this.openModal(this.props.jewelry)}
                >
                    <h5 className="card-title">{this.props.jewelry.name}</h5>
                    <img className="photos-of-card" src={this.props.jewelry.photo} alt={this.props.jewelry.name} />
                    <p className="card-text">
                       Стоимость: {this.props.jewelry.price} тенге
                    </p>
                    <p className="card-text">
                        {this.props.jewelry.description}
                    </p>
                    <p className="card-text">
                        {this.props.jewelry.category.type}
                    </p>
                </div>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Jewelry Modal"
                >
                    <div className="modal-card">
                    <h2 className="card-title">{this.state.jewelry.name}</h2>
                    <img className="photo-of-modal" src={this.state.jewelry.photo} alt={this.state.jewelry.name} />
                    <p className="card-text-modal"> Price: {this.state.jewelry.price} тенге</p>
                        <p className="card-text-modal">For the purchase of jewelry, please contact <a href="https://t.me/zhetkerbaevan">here</a></p>
                        <p className="card-text-modal">
                            {this.props.jewelry.description}
                        </p>
                        <button className="btn btn-dark" onClick={this.closeModal}>Close</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withErrorBoundary(JewelryModal, {
    fallback: <h2>ERROR</h2>
});