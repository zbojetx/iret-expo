import React from "react";
import Animated from "react-native-reanimated";

export const circleDiameter = 50;
export const circleHeight = 60;
export const circleWidth = 40
const circleRadius = circleDiameter / 2;

export const Circle = ({ translateX, translateY }) => {
    return (
        <Animated.View
            style={{
                transform: [{ translateX }, { translateY }],
                position: "absolute",
                width: 40,
                height: 60,
                // borderRadius: circleRadius,
                backgroundColor: "#ff0000"
            }}
        ></Animated.View>
    );
};