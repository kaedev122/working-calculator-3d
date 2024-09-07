import React, {useState, useEffect} from 'react';
import { Box, Text } from '@react-three/drei';

const CalculatorScreen = ({screenText, operation, subText}) => {
    return (
        <group position={[0, 0.8, 0.11]}>
            <Box args={[1.8, 0.7, 0.1]}>
                <meshStandardMaterial color="#000000" />
            </Box>
            <Text
                position={[0.85, 0.35, 0.06]}
                fontSize={0.2}
                color="#ff0000"
                anchorX="right"
                anchorY="top"
            >
                {subText}
            </Text>
            <Text
                position={[0.85, 0.03, 0.06]}
                fontSize={0.2}
                color="#ff0000"
                anchorX="right"
                anchorY="middle"
            >
                {operation}
            </Text>
            <Text
                position={[0.85, -0.3, 0.06]}
                fontSize={0.2}
                color="#ff0000"
                anchorX="right"
                anchorY="bottom"
            >
                {screenText}
            </Text>
        </group>
    );
}

export default React.memo(CalculatorScreen);