import React, { useState, useEffect } from "react";

const AudioControler = ({ audioSrc }) => {
    const [volume, setVolume] = useState(() => {
        const savedVolume = localStorage.getItem('audioVolume');
        return savedVolume !== null ? parseFloat(savedVolume) : 0.3;
    });

    useEffect(() => {
        const audio = document.getElementById('background-music');
        audio.volume = volume;
        audio.play();
    }, []);

    useEffect(() => {
        const audio = document.getElementById('background-music');
        audio.volume = volume;
        localStorage.setItem('audioVolume', volume);
    }, [volume]);
    
    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };

    return (
        <div>
            <audio id="background-music" src={audioSrc} loop></audio>
            <div id='volumeControl' className='fixed top-0 w-10 h-10 p-10 text-white text-center'>
                <label htmlFor="volume-control">Música:</label>
                <input
                    id="volume-control"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </div>
        </div>
    );
};

export default AudioControler;