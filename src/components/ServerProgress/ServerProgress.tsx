import React, { useEffect, useRef, useState } from 'react';

import './ServerProgress.css';

interface ServerProgressProps {
  value: number;
  isBlink?: boolean;
  isSoundNotification?: boolean;
}

export const ServerProgress: React.FC<ServerProgressProps> = ({
  value,
  isBlink = true,
  isSoundNotification = true,
}) => {
  const [internalValue, setInternalValue] = useState(0);
  const audioAlert = new Audio('https://www.myinstants.com/media/sounds/bmw-bong.mp3');
  const clampedValue = Math.min(Math.max(internalValue, 0), 100);
  const prevValueRef = useRef(value);
  const isFirstRender = useRef(true);

  let btnClass = 'progressCell';
  if (value > 90 && isBlink) {
    btnClass += ' active';
  }

  // Эффект для начальной анимации
  useEffect(() => {
    const animateUp = () => {
      let currentValue = 0;
      const interval = setInterval(() => {
        currentValue += 2;
        setInternalValue(currentValue);
        if (currentValue >= 100) {
          clearInterval(interval);
          animateDown();
        }
      }, 20);
    };

    const animateDown = () => {
      let currentValue = 100;
      const interval = setInterval(() => {
        currentValue -= 2;
        setInternalValue(currentValue);
        if (currentValue <= 0) {
          clearInterval(interval);
          isFirstRender.current = false;
          setInternalValue(value);
        }
      }, 10);
    };

    if (isFirstRender.current) {
      animateUp();
    }
  }, []);

  // Эффект для обработки изменений value после начальной анимации
  useEffect(() => {
    if (!isFirstRender.current) {
      setInternalValue(value);
      if (prevValueRef.current < 90 && value >= 90 && isSoundNotification) {
        audioAlert.play();
      }
      prevValueRef.current = value;
    }
  }, [value]);

  const getGradientStyle = () => {
    let baseColor;
    if (clampedValue >= 90) {
      baseColor = 'rgba(252, 3, 3'; // красный
    } else if (clampedValue >= 80) {
      baseColor = 'rgba(252, 240, 3'; // более приятный желтый
    } else {
      baseColor = 'rgba(3, 252, 69'; // более яркий зеленый
    }

    return {
      background: `linear-gradient(to right,
        ${baseColor}, 0.7) ${clampedValue}%,
        ${baseColor}, 0.6) ${clampedValue + 0}%,
        white, ${clampedValue + 10}%,
        white)`,
      width: '100%',
    };
  };

  return (
    <div className={btnClass} style={getGradientStyle()}>
      <span className="valueText">{clampedValue}%</span>
    </div>
  );
};
