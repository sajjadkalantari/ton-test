import { useEffect, useState } from 'react';

const WelcomeVideo = ({ onVideoEnd }: any) => {
    const [isFirstVisit, setIsFirstVisit] = useState(false);

    useEffect(() => {
        // Check if it's the first visit
        const firstVisit = localStorage.getItem('firstVisit') === null;

        if (firstVisit) {
            // Mark as visited
            localStorage.setItem('firstVisit', 'no');
            setIsFirstVisit(true);
        } else {
            // If not the first visit, immediately end video
            onVideoEnd();
        }
    }, [onVideoEnd]);

    if (!isFirstVisit) {
        // If it's not the first visit, we don't need to render the video
        return null;
    }

    return (
        <video width="100%" height="100%" autoPlay onEnded={onVideoEnd}>
            <source src="/welcome.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};

export default WelcomeVideo;
