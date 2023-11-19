import React, { Component } from 'react';
import Service from "../../services/Service";
import JewelryModal from "./JewelryModal";

const withLogging = (WrappedComponent) => {
    class WithLogging extends Component {
        componentDidMount() {
            console.log(`Component ${WrappedComponent.displayName || WrappedComponent.name} is loaded.`);
        }

        componentWillUnmount() {
            console.log(`Component ${WrappedComponent.displayName || WrappedComponent.name} was unloaded.`);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    WithLogging.displayName = `WithLogging(${WrappedComponent.displayName || WrappedComponent.name})`;

    return WithLogging;
};

const withTitle = (WrappedComponent, title) => {
    class WithTitle extends Component {
        componentDidMount() {
            document.title = title;
        }

        componentWillUnmount() {
            document.title = '';
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    WithTitle.displayName = `WithTitle(${WrappedComponent.displayName || WrappedComponent.name})`;

    return WithTitle;
};

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jewelries: [],
            error: null
        };
    }



    async componentDidMount() {
        try {
            const res = await Service.getJewelries();
            this.setState({ jewelries: res.data, error: null });
        } catch (error) {
            this.setState({ error });
            console.log("Failed to fetch jewelries:", error.message);
        }
    }

    render() {
        const {error } = this.state;
        if (error){
            throw error;
        }
        return (
            <div className="jewelry-card-container">
                {this.state.jewelries.map((jewelry) => (
                    <JewelryModal jewelry={jewelry} key={jewelry.id} />
                ))}
            </div>
        );
    }
}

const HomeWithLoggingAndTitle = withTitle(withLogging(Home), 'Home');

export default HomeWithLoggingAndTitle;
