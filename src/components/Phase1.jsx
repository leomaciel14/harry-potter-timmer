import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Phase1 = () => {
    const [volume, setVolume] = useState(0.1);

    useEffect(() => {
        const audio = document.getElementById('background-music');
        audio.volume = volume;
        audio.play();
    }, []);

    useEffect(() => {
        const audio = document.getElementById('background-music');
        audio.volume = volume;
    }, [volume]);

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };


    const navigate = useNavigate();
    const [snitchSpeed, setSnitchSpeed] = useState(200);
    const [snitchCaught, setSnitchCaught] = useState(false);

    const handleSnitchCaught = () => {
        setSnitchCaught(true);
        alert('You caught the Golden Snitch!');
        navigate('/phase2');
    };

    useEffect(() => {
        const gameArea = document.getElementById('game');
        const snitch = document.getElementById('golden-snitch');

        if (!gameArea || !snitch) return;

        function moveSnitch() {
            if (!snitchCaught) {
                const maxX = gameArea.offsetWidth - snitch.offsetWidth;
                const maxY = gameArea.offsetHeight - snitch.offsetHeight;
                const x = Math.random() * maxX;
                const y = Math.random() * maxY;
                snitch.style.left = `${x}px`;
                snitch.style.top = `${y}px`;
            }
        }

        function mouseMoveHandler(event) {
            const rect = snitch.getBoundingClientRect();
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            const distX = mouseX - (rect.left + rect.width / 2);
            const distY = mouseY - (rect.top + rect.height / 2);
            const distance = Math.sqrt(distX * distX + distY * distY);

            if (distance < 100) {
                setSnitchSpeed(100);
            } else {
                setSnitchSpeed(1000);
            }
        }

        gameArea.addEventListener('mousemove', mouseMoveHandler);

        const intervalId = setInterval(moveSnitch, snitchSpeed);

        return () => {
            clearInterval(intervalId);
            gameArea.removeEventListener('mousemove', mouseMoveHandler);
        };
    }, [snitchSpeed, snitchCaught]);

    return (

        <div className="w-full h-full bg-yellow-100">

            <div className='fixed top-0 w-10 h-10 z-50 p-10 text-white text-center'>
                <audio id="background-music" src="Harry Potter Quidditch Themes (Suite).mp3" loop></audio>
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

            <div id="game" className='absolute w-full h-full overflow-hidden'>
                <div className='absolute w-full h-full overflow-hidden bg-[url("quadrilball.webp")] bg-cover bg-center brightness-50'></div>
                <img
                    id="golden-snitch"
                    className='absolute w-52 cursor-pointer transition-all'
                    src="pomo.gif"
                    alt="Golden Snitch"
                    onClick={handleSnitchCaught}
                />
            </div>
        </div>
    );
};

export default Phase1;
