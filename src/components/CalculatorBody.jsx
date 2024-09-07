import { Plane, Box } from '@react-three/drei'
import React, {useState, useEffect, useRef} from 'react';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import image from '../assets/image.png';

const CalculatorBody = ({screenText, setSubScreenText, setOperation, setScreenText}) => {
    const texture = useLoader(TextureLoader, image);
    const materialRef = useRef();

	const easterEgg = () => {
		if (screenText === '12041997') {
            return texture;
		}
        return null;
	}

    useEffect(() => {
        if (easterEgg()) {
            materialRef.current.map = easterEgg();
            materialRef.current.needsUpdate = true;
        }
    }, [screenText, texture]);

    return (
        <Box args={[2, 2.5, 0.2]} position={[0, 0, 0]}>
            <meshStandardMaterial ref={materialRef} color={"#cccccc"} />
        </Box>
    );
}

export default React.memo(CalculatorBody);