import React, { useState, useRef, useCallback } from 'react';
import { Box, Text } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { useSpring, animated, config } from "@react-spring/three";

const CalculatorButton = ({ position, label, handleClick, color = "#ffffff", size = 0.32 }) => {
    const [active, setActive] = useState(false);
    const isHovered = useRef(false);
    const sizeX = size;
    const sizeY = label === "=" ? size*2.25 : size;
    const boxRef = useRef();

    useFrame(() => {
        if (isHovered.current) {
            boxRef.current.scale.x = 1.1;
            boxRef.current.scale.y = 1.1;
        }
        if (!isHovered.current) {
            boxRef.current.scale.x = 1;
            boxRef.current.scale.y = 1;
        }
    });

    const springs = useSpring({ 
        scale: active ? 1.1 : 1,
        onRest: () => setActive(false),
        config: config.wobbly 
    });

    const onClick = useCallback(() => {
        if (boxRef.current) {
            setActive(true);
            handleClick(label);
        }
    }, [handleClick, label]);
    //scale={scale.to(s => [s, s, s])}
    return (
        <animated.mesh 
            scale={springs.scale} 
            onClick={() => onClick()} 
            onPointerOver={() => {
                isHovered.current = true;
            }}      
            onPointerLeave={() => {
                isHovered.current = false;
            }} 
            ref={boxRef} 
            position={position}
        >
            <Box 
                args={[sizeX, sizeY, 0.1]} 
                onClick={onClick}
            >
                <meshStandardMaterial color={color} />
            </Box>
            <Text
                position={[0, 0, 0.06]}
                fontSize={0.2}
                color="#000000"
                anchorX="center"
                anchorY="middle"
            >
                {label}
            </Text>
        </animated.mesh>
    );
}

export default React.memo(CalculatorButton);