// Trackable.js

import React from 'react';
const { cloneElement, isValidElement } = React;

const eventPropMap = {
    press: "onPress",
    longPress: "onLongPress",
    focus: "onFocus",
    blur: "onBlur",
    change: "onChangeText",
    submit: "onSubmitEditing",
    scroll: "onScroll",
    contentSizeChange: "onContentSizeChange",
    layout: "onLayout",
    keyPress: "onKeyPress",
    endEditing: "onEndEditing",
    selectionChange: "onSelectionChange",
    touchStart: "onTouchStart",
    touchMove: "onTouchMove",
    touchEnd: "onTouchEnd",
    touchCancel: "onTouchCancel",
    momentumScrollBegin: "onMomentumScrollBegin",
    momentumScrollEnd: "onMomentumScrollEnd",
    scrollBeginDrag: "onScrollBeginDrag",
    scrollEndDrag: "onScrollEndDrag",
    accessibilityAction: "onAccessibilityAction",
    accessibilityTap: "onAccessibilityTap",

};


const Trackable = ({ children, event, context = {}, data = {}, logger }) => {

    const targetProp = eventPropMap[event];

    if (!isValidElement(children) || !targetProp) return children;

    const existingHandler = children.props[targetProp];

    const wrappedHandler = (...args) => {
        logger.info({ ...context, ...data });

        if (typeof existingHandler === "function") {
            existingHandler(...args);
        }
    };

    return cloneElement(children, {
        [targetProp]: wrappedHandler,
    });
};

export default Trackable
