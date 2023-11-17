import React, { useState, useRef } from 'react';

export const BackgroundChange = () => {
    const [startColor, setStartColor] = useState(''); // Initial start color
    const [endColor, setEndColor] = useState(''); // Initial end color
    const [gradientDegree, setGradientDegree] = useState(0); // Initial gradient degree
    const [cssValue, setCssValue] = useState(''); // Updated CSS value to copy
    const textareaRef = useRef(null);

    // Callback function to set the gradient colors and degree ------------------------------------------->
    const handleColorChange = (event) => {
        const { name, value } = event.target;
        if (name === 'startColor') {
            setStartColor(value);
        } else if (name === 'endColor') {
            setEndColor(value);
        } else if (name === 'gradientDegree') {
            setGradientDegree(value);
        }
        updateCssValue();
    };

    // Function to update the CSS value ------------------------------------------------------------------->
    const updateCssValue = () => {
        const updatedCssValue = `linear-gradient(${gradientDegree}deg, ${startColor}, ${endColor})`;
        setCssValue(updatedCssValue);
        textareaRef.current.value = updatedCssValue;
    };

    // Function to copy the CSS value --------------------------------------------------------------------->
    const handleCopyCSS = () => {
        textareaRef.current.select();
        document.execCommand('copy');
    };

    return (
        <div className="app-container">
            <div
                className="color-box"
                style={{
                    background: `linear-gradient(${gradientDegree}deg, ${startColor}, ${endColor})`,
                }}
            ></div>
            <input
                type="text"
                placeholder="Enter start color"
                name="startColor"
                onChange={handleColorChange}
                value={startColor}
            />
            <input
                type="text"
                placeholder="Enter end color"
                name="endColor"
                onChange={handleColorChange}
                value={endColor}
            />
            <label>
                Gradient Degree:
                <input
                    type="range"
                    min="0"
                    max="360"
                    value={gradientDegree}
                    onChange={handleColorChange}
                    name="gradientDegree"
                />
                {gradientDegree}°
            </label>

            <textarea ref={textareaRef} value={cssValue} readOnly />
            <button onClick={handleCopyCSS}>Copy CSS</button>
        </div>
    );
};
