//@ts-check
import React from "react";
import { Text, View } from "react-native";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.logger = props.logger;
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    componentDidCatch(error, info) {
        this.logger.error({
            type: 'reactErrorBoundary',
            error: error?.message || String(error),
            stack: error?.stack,
            componentStack: info?.componentStack,
        });
        this.setState({ hasError: true, error, errorInfo: info });
    }

    render() {
        if (this.state.hasError) {
            const { fallbackUI: FallbackUI } = this.props;

            if (FallbackUI) {
                return <FallbackUI error={this.state.error} errorInfo={this.state.errorInfo} />;
            }

            return (
                <View style={{ padding: 20 }}>
                    <Text style={{ color: 'red', fontWeight: 'bold' }}>
                        Something went wrong.
                    </Text>
                    <Text>{JSON.stringify(this.state.errorInfo, null, 2)}</Text>
                </View>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
