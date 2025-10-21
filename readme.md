# logstyx-js-react-native

This repository contains the `logstyx` SDK tailored for React Native applications. It provides utilities to log events and errors, making it easier to monitor and debug your mobile applications.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [License](#license)

## Installation

To get started with the `logstyx` SDK, you need to add it as a dependency in your project:

```bash
npm install github:devatlogstyx/logstyx-js-react-native
```

Ensure you also have React and React Native installed, as they are peer dependencies.

## Usage

Here's a simple example of how to use the logstyx SDK in your React Native project:

```javascript
import logstyx from 'logstyx-js-react-native';
import { Text, View } from "react-native";

const logger = logstyx({
    projectId:"YOUR_PROJECT_ID",
    appid: 'YOUR_APP_ID', // Replace with your app ID
    captureUncaught: true, 
    captureUnhandledRejections: true 
});

const { ErrorBoundary, Trackable} = logger

function CustomFallbackUI({ error, errorInfo }) {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ color: 'red', fontWeight: 'bold' }}>
        Something went wrong.
      </Text>
      <Text>{JSON.stringify(this.state.errorInfo, null, 2)}</Text>
    </View>
  );
}

// Use ErrorBoundary to catch errors in a component tree
const App = () => (
  <ErrorBoundary logger={logger} fallbackUI={CustomFallbackUI}>
    <App />
  </ErrorBoundary>
);

// Use Trackable anywhere in your code to track events
<Trackable event="press" context={{userId:"123"}} data={{action:"subscribe"}}>
  <TouchableOpacity>subscribe now!</TouchableOpacity>
</Trackable>

// You can also dorectly send an info log
logger.info({ message: "This is an info log!" });

// a warning log
logger.warning({ message: "This is a warning log!" });

// an error log
logger.error({ message: "This is an error log!" });

// a error log
logger.critical({ message: "This is an critical log!" });


// a custom level log
logger.send("custom",{ message: "This is an custom log!" });

```

### Event Tracking

To track events, wrap your components with the `Trackable` component provided by the SDK. You can define which events to monitor such as `press`, `longPress`, and more.

## Configuration

You can configure the SDK by passing the necessary parameters like `appid` when initializing the SDK.

## License

This project is licensed under the ISC License.