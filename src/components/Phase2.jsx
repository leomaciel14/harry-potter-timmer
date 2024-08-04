import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioControler from './AudioControler';
import Timer from './Timer';
import '../App.css';
import './Phase2.css';
import Credits from './Credits';

const Phase2 = () => {
    const navigate = useNavigate();
    const numberOfKeys = 25;
    const correctKeyId = 'key-1';

    const [startClosingAnimation, setStartClosingAnimation] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const [isOuterButtonVisible] = useState(true);

    const handleOuterButtonClick = () => {
        const title = document.getElementById('title');
        title.classList.add('animate-out');
        setTimeout(() => {
            title.classList.add('hidden');
        }, 1000);
    };

    useEffect(() => {
        const keys = document.querySelectorAll('.key');

        function moveKeys() {
            keys.forEach((key) => {
                const maxX = window.innerWidth - key.offsetWidth;
                const maxY = window.innerHeight - key.offsetHeight;
                const x = Math.random() * maxX;
                const y = Math.random() * maxY;
                key.style.left = `${x}px`;
                key.style.top = `${y}px`;
            });
        }

        function handleMouseOver(event, key) {
            const rect = key.getBoundingClientRect();
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            const distX = mouseX - (rect.left + rect.width / 2);
            const distY = mouseY - (rect.top + rect.height / 2);
            const distance = Math.sqrt(distX * distX + distY * distY);

            if (distance < 100) {
                setTimeout(() => {
                    const maxX = window.innerWidth - key.offsetWidth;
                    const maxY = window.innerHeight - key.offsetHeight;
                    const x = Math.random() * maxX;
                    const y = Math.random() * maxY;
                    key.style.left = `${x}px`;
                    key.style.top = `${y}px`;
                }, 200);
            }
        }

        function handleKeyClick(key) {
            const openDoor = document.getElementById('open-door');
            const rightKey = document.getElementById('right-key');
            const keys = document.getElementById('keys-container');
            const doorLeft = document.getElementById('doorLeft');
            const doorRight = document.getElementById('doorRight');
            const playback = document.getElementById('background-music')

            const fadeOutVolume = (audioElement, duration, callback) => {
                const step = audioElement.volume / (duration / 50);

                const fadeAudio = setInterval(() => {
                    if (audioElement.volume > 0.05) {
                        audioElement.volume -= step;
                    } else {
                        clearInterval(fadeAudio);
                        audioElement.volume = 0;
                        if (callback) callback();
                    }
                }, 50);
            };


            if (key.id === correctKeyId) {

                fadeOutVolume(playback, 2000, () => {
                    setTimeout(() => {
                        playback.src = 'The-Resurrection-Stone.mp3';
                        playback.volume = 0.8
                        playback.play();
                    }, 1000);
                });

                openDoor.volume = 0.7;
                rightKey.volume = 0.2;
                openDoor.play();
                rightKey.play();

                doorLeft.classList.add('openDoorLeft')
                doorRight.classList.add('openDoorRight')

                keys.classList.add('z-50')

                key.style.display = 'none';
                setShowTimer(true);

            } else {
                key.style.display = 'none';
            }
        }

        keys.forEach((key) => {
            key.addEventListener('mouseover', (event) => handleMouseOver(event, key));
            key.addEventListener('click', () => handleKeyClick(key));
        });

        moveKeys();
        const moveInterval = setInterval(moveKeys, 4000); // Mover chaves a cada 4 segundos

        return () => {
            clearInterval(moveInterval);
            keys.forEach((key) => {
                key.removeEventListener('mouseover', (event) => handleMouseOver(event, key));
                key.removeEventListener('click', () => handleKeyClick(key));
            });
        };
    }, [navigate]);
    
    return (
        <div id="phase-2" className='w-full h-dvh'>
            <Credits />

            <audio id="background-music" src="Flying-Keys.mp3" loop></audio>
            <audio id="open-door" src="open-door.wav"></audio>
            <audio id="right-key" src="harp-piano-dreamy.mp3"></audio>
            <AudioControler />

            <div id='title' className='absolute flex flex-col items-center justify-center w-full h-dvh z-50 bg-black/50 backdrop-blur-xl'>
                <h1 id='focus-in-expand-fwd' className='text-white text-8xl text-center p-5'>2º Desafio</h1>
                <p id='text-focus-in' className='text-white text-3xl text-center bluu-next-bolditalic '>Encontre a chave certa!</p>
                {isOuterButtonVisible && (
                    <button id='btn-in' onClick={handleOuterButtonClick} className='mt-12 px-5 py-2 border-2 border-white/40 rounded-full text-white/50 text-xl hover:text-white hover:border-white hover:scale-105 transition-all'>Continuar</button>
                )}
            </div>

            <div className='absolute w-full h-full bg-stone-700'>
                <div className='absolute w-full h-dvh overflow-hidden bg-cover bg-center brightness-50'>
                    <img src="./daedalian-keys-bg.webp" alt="" className='h-full w-full' />
                </div>
                <div id='doorLeft' className='absolute w-full h-full overflow-hidden bg-cover bg-center brightness-75'>
                    <img src="./door-a.webp" alt="" className='h-full w-full' />
                </div>
                <div id='doorRight' className='absolute w-full h-full overflow-hidden bg-cover bg-center brightness-75'>
                    <img src="./door-b.webp" alt="" className='h-full w-full' />
                </div>
                <div id="keys-container" className='inset-0'>
                    {Array.from({ length: numberOfKeys }).map((_, index) => (
                        <img
                            key={index}
                            className="key absolute w-20 cursor-pointer"
                            id={`key-${index + 1}`}
                            src="chave.gif"
                            alt={`Key ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {showTimer && (
                <div className='timer-container'>
                    <Timer />
                </div>
            )}

            <img id='transition-left' src="left.png" alt="" className={`fixed w-full left-0 h-dvh overflow-hidden ${startClosingAnimation ? 'closing' : ''}`} />
            <img id='transition-right' src="right.png" alt="" className={`fixed w-full right-0 h-dvh overflow-hidden ${startClosingAnimation ? 'closing' : ''}`} />
        </div>
    );
};

export default Phase2;
