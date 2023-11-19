import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Service from "../../services/Service";
import {connect} from "react-redux";
import {fetchJewelries} from "../Redux/Actions/Actions";
import {bindActionCreators} from "redux";

class ListJewelries extends Component {
    constructor(props){
        super(props)

        this.state = {
            jewelries: []
        }
    }
    componentDidMount() {
        this.props.fetchJewelries();
    }

    handleDeleteJewelries = (id) => {
        Service.deleteJewelry(id)
            .then(() => {
                this.setState((prevState) => {
                    const updatedJewelries = prevState.jewelries.filter(
                        (jewelry) => jewelry.id !== id
                    );
                    return { jewelries: updatedJewelries };
                });
            })
            .catch((error) => {
                console.log('Deleting error:', error.message);
            });
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevState.jewelries !== this.state.jewelries) {
            console.log('Array was changed:', prevState.jewelries, '->', this.state.jewelries);
        }
    }
    render() {
        const { jewelries } = this.props;

        return (
            <div>
                <h2 className="text-center">Jewelries</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                    </tr>
                    </thead>
                    <tbody>
                    {jewelries.map((jewelry) => (
                        <tr key={jewelry.id}>
                            <td>{jewelry.id}</td>
                            <td>{jewelry.name}</td>
                            <td>{jewelry.price}</td>
                            <td>{jewelry.description}</td>
                            <td>{jewelry.photo}</td>
                            <td>{jewelry.category.type}</td>
                            <td>
                                <button
                                    onClick={() => this.handleDeleteJewelries(jewelry.id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                                <br></br>
                                <br></br>
                                <button className="btn btn-warning">
                                <Link to={`/edit/jewelry/${jewelry.id}`}>Edit</Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    jewelries: state.jewelries,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchJewelries,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListJewelries);


