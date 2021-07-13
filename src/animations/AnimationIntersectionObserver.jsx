import React, { useEffect } from 'react';

const AnimationIntersectionObserver = ({
    children,
}) => {
    const ratio = 0.1;
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: ratio,
    };

    const handleIntersection = (entries) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio > ratio) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    useEffect(() => {
        const elements = document.querySelectorAll('.reveal');
        if (elements.length !== 0) {
            elements.forEach((element) => {
                observer.observe(element);
            });
        }

        return function cleanup() {
            if (elements.length !== 0) {
                elements.forEach((element) => {
                    observer.unobserve(element);
                });
            }
        };
    });

    return <>{children}</>;
};

export default AnimationIntersectionObserver;
