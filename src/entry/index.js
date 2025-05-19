//@ts-check
import Trackable from "../wrapper/trackable.js";
import useLogstyx from "logstyx-js-core"
import ErrorBoundary from "../wrapper/error.boundary.js";
import { Platform, Dimensions, ErrorUtils } from "react-native";
import { generateSignature } from "../lib/react-native.js";

export default (options = {}) => {
    let device;

    if (!options?.appid) {
        console.error("[Logstyx] `appid` is required when using the SDK from a mobile app (React Native).");
        return null;
    }

    const { width, height } = Dimensions.get("screen");
    device = {
        type: "react-native",
        origin: null,
        os: Platform.OS,
        platform: Platform.OS,
        browser: null,
        screen: `${width}x${height}`
    };

    // Initialize logger
    const instance = useLogstyx({
        ...options,
        device,
        signatureFunc: generateSignature,
    });

    ErrorUtils.setGlobalHandler((error, isFatal) => {
        instance.send(isFatal ? "critical" : "error", { message: error.message, stack: error.stack });
    });

    instance.Trackable = (n) => {
        return <Trackable {...n} logger={instance} />;
    };

    instance.ErrorBoundary = (n) => {
        return <ErrorBoundary {...n} logger={instance} />;
    };

    return instance;
};

