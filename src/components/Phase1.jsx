import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioControler from './AudioControler';
import '../App.css';
import './Phase1.css';

const Phase1 = () => {
    const [startClosingAnimation, setStartClosingAnimation] = useState(false);
    const [volume, setVolume] = useState(0.3);
    const [isOuterButtonVisible] = useState(true);

    const handleLinkClick = (e) => {
        e.preventDefault();
        setStartClosingAnimation(true);

        setTimeout(() => {
            navigate("/phase2");
        }, 2000);
    };

    const navigate = useNavigate();
    const [snitchSpeed, setSnitchSpeed] = useState(200);
    const [snitchCaught, setSnitchCaught] = useState(false);

    const handleSnitchCaught = () => {
        const endTitle = document.getElementById('end');

        if (endTitle) {
            endTitle.classList.remove('opacity-0');
            endTitle.classList.add('animate-in');
            endTitle.classList.remove('-z-50');
            endTitle.classList.add('z-50');
        }

        setSnitchCaught(true);
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

                const scale = 0.5 + Math.random();
                snitch.style.transform = `scale(${scale})`;
            }
        }

        function mouseMoveHandler(event) {
            const wings_fast = document.getElementById('wings_fast');
            const wings_slow = document.getElementById('wings_slow');

            wings_fast.volume = volume;
            wings_slow.volume = volume;

            const rect = snitch.getBoundingClientRect();
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            const distX = mouseX - (rect.left + rect.width / 2);
            const distY = mouseY - (rect.top + rect.height / 2);
            const distance = Math.sqrt(distX * distX + distY * distY);


            function playRandomWingSound() {
                const random = Math.random();
                if (random < 0.5) {
                    wings_fast.play();
                    wings_slow.pause();
                    wings_slow.currentTime = 0;
                } else {
                    wings_slow.play();
                    wings_fast.pause();
                    wings_fast.currentTime = 0;
                }
            }

            if (distance < 100) {
                setSnitchSpeed(100);
                playRandomWingSound();
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



    const handleOuterButtonClick = () => {
        const title = document.getElementById('title');

        title.classList.add('animate-out');
        setTimeout(() => {
            title.classList.add('hidden');
        }, 1000);

    };

    return (

        <div className="w-full h-full">

            <audio id="background-music" src="Harry Potter Quidditch Themes (Suite).mp3" loop></audio>
            <audio id="wings_fast" src="Wings_Fast.mp3"></audio>
            <audio id="wings_slow" src="Wings_Slow.mp3"></audio>

            <AudioControler />

            <div id='title' className='absolute flex flex-col items-center justify-center w-full h-dvh z-50 bg-black/50 backdrop-blur-xl'>
                <h1 id='focus-in-expand-fwd' className='text-white text-8xl text-center p-5'>1º Desafio</h1>
                <p id='text-focus-in' className='text-white text-3xl text-center bluu-next-bolditalic '>Pegue o Pomo de Ouro!</p>
                {isOuterButtonVisible && (
                    <button id='btn-in' onClick={handleOuterButtonClick} className='mt-12 px-5 py-2 border-2 border-white/40 rounded-full text-white/50 text-xl hover:text-white hover:border-white hover:scale-105 transition-all'>Continuar</button>
                )}
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

            <div id='end' className='-z-50 opacity-0 absolute flex flex-col items-center justify-center w-full h-dvh bg-black/50 backdrop-blur-xl'>
                <h1 id='focus-in-expand-fwd' className='text-white text-8xl text-center p-5'>Você pegou!</h1>
                <p id='text-focus-in' className='text-white text-3xl text-center bluu-next-bolditalic '>Vamos para o próximo desafio</p>
                <button id='btn-in' onClick={handleLinkClick} className='mt-12 px-5 py-2 border-2 border-white/40 rounded-full text-white/50 text-xl hover:text-white hover:border-white hover:scale-105 transition-all'>Continuar</button>
            </div>

            <img id='transition-left' src="left.png" alt="" className={`fixed w-full left-0 h-dvh overflow-hidden ${startClosingAnimation ? 'closing' : ''}`} />
            <img id='transition-right' src="right.png" alt="" className={`fixed w-full right-0 h-dvh overflow-hidden ${startClosingAnimation ? 'closing' : ''}`} />

        </div>
    );
};

export default Phase1;
