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

    ErrorUtils.setGlobalHandler((err, isFatal) => {
        instance.send(isFatal ? "CRITICAL" : "ERROR", {
            title: err?.name || "Unknown Error",
            message: err?.message,
            stack: err?.stack || null
        });
    });

    instance.Trackable = (n) => {
        return <Trackable {...n} logger={instance} />;
    };

    instance.ErrorBoundary = (n) => {
        return <ErrorBoundary {...n} logger={instance} />;
    };

    return instance;
};

