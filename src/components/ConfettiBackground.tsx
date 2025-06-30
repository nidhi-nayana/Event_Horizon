'use client';

import React, { useEffect, useState } from 'react';

interface ConfettiPieceStyle {
    left: string;
    animationDuration: string;
    animationDelay: string;
    backgroundColor: string;
    width: string;
    height: string;
    transform: string;
}

const ConfettiBackground = () => {
    const [styles, setStyles] = useState<ConfettiPieceStyle[]>([]);

    useEffect(() => {
        const confettiCount = 75;
        const newStyles: ConfettiPieceStyle[] = [];
        const colors = [
            'hsl(var(--primary))',
            'hsl(var(--accent))',
            'hsl(var(--chart-1))',
            'hsl(var(--chart-2))',
            'hsl(var(--chart-3))',
            'hsl(var(--chart-4))',
            'hsl(var(--chart-5))',
        ];

        for (let i = 0; i < confettiCount; i++) {
            const size = `${Math.random() * 6 + 4}px`;
            newStyles.push({
                left: `${Math.random() * 100}vw`,
                animationDuration: `${Math.random() * 5 + 5}s`,
                animationDelay: `${Math.random() * 10}s`,
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                width: size,
                height: size,
                transform: `rotate(${Math.random() * 360}deg)`,
            });
        }
        setStyles(newStyles);
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
            {styles.map((style, i) => (
                <div key={i} className="absolute animate-confetti-fall" style={style} />
            ))}
        </div>
    );
};

export default ConfettiBackground;
