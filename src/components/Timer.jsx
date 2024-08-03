import React, { useState, useEffect, useRef } from 'react';
import './Timer.css'

const Timer = () => {
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [timeUp, setTimeUp] = useState(false);
    const videoRef = useRef(null);
    const [playbackRate, setPlaybackRate] = useState(0.1);

    const startTimer = (duration) => {
        setTimer(duration);
        setIsRunning(true);
        setHasStarted(true);
        setTimeUp(false);
        setPlaybackRate(0.1);
        isRunning(true);
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const stopTimer = () => {
        setIsRunning(false);
        setHasStarted(false);
        setTimer(0);
        isRunning(false);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setHasStarted(false);
        setTimeUp(false);
        setTimer(0);
    };

    useEffect(() => {
        let interval;

        if (isRunning && timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        } else if (timer <= 0 && hasStarted) {
            clearInterval(interval);
            setIsRunning(false);
            setTimeUp(true);
        }

        return () => clearInterval(interval);
    }, [isRunning, timer, hasStarted]);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            if (isRunning) {
                videoElement.play();
                requestAnimationFrame(increasePlaybackRate);
            } else {
                videoElement.pause();
            }
        }
    }, [isRunning]);

    const increasePlaybackRate = () => {
        if (isRunning && playbackRate < 1) {
            setPlaybackRate(prevRate => Math.min(prevRate + 0.003, 1));
            requestAnimationFrame(increasePlaybackRate);
        }
    };

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.playbackRate = playbackRate;
            videoElement.style.animationPlayState = isRunning ? 'running' : 'paused';
        }
    }, [playbackRate]);

    const handleStart = () => {
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        startTimer(totalSeconds);
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div id="phase-2" className='w-full h-full flex flex-col items-center justify-center'>
            <div className='absolute w-full h-full overflow-hidden bg-[url("chamber.webp")] bg-cover bg-center brightness-50 -z-40'></div>
            <div id='pulse'>
                <video
                    id="timer-video"
                    className="w-40 mt-12"
                    src="viratempo.webm"
                    ref={videoRef}
                    style={{ animation: 'spin 2s linear infinite' }}
                    loop
                />
            </div>
            
            <div id="timer-setup" className='p-4 flex items-center justify-center'>
                {!hasStarted && (
                    <>
                        <input className='p-4 w-24 text-center rounded-xl bg-stone-950/80 bg-blend-multiply text-white text-xl' type="number" id="hours" placeholder="HH" />
                        <p className='text-white' >:</p>
                        <input className='p-4 w-24 mx-2 text-center rounded-xl bg-stone-950/80 bg-blend-multiply text-white text-xl' type="number" id="minutes" placeholder="MM" />
                        <p className='text-white' >:</p>
                        <input className='p-4 w-24 text-center rounded-xl bg-stone-950/80 bg-blend-multiply text-white text-xl' type="number" id="seconds" placeholder="SS" />
                    </>
                )}
                {hasStarted && !timeUp && (
                    <div id="timer-display" className={`text-white my-4 ${!isRunning ? 'animate-blink' : ''}`}>
                        <span id="time" className='text-5xl font-bold'>{formatTime(timer)}</span>
                    </div>
                )}
                {timeUp && (
                    <div id="time-up-message" className='text-white my-4'>
                        <p className='text-3xl font-bold'>Tempo esgotado!</p>
                        <button className='mt-4 px-5 py-4 bg-yellow-950/90 border-2 border-yellow-800 hover:border-yellow-950 hover:bg-yellow-600/90 transition-all duration-500 text-white rounded-xl font-bold uppercase text-md' onClick={resetTimer}>Novo Timer</button>
                    </div>
                )}
            </div>

            <div className='flex space-x-4'>
                {!hasStarted && <button className='font-bluu-next px-8 py-4 bg-yellow-950/90 border-2 border-yellow-800 hover:border-yellow-950 hover:bg-yellow-600/90 transition-all duration-500 text-white rounded-xl font-bold uppercase text-md' onClick={handleStart}>Iniciar</button>}
                {hasStarted && !timeUp && <button className='px-5 py-4 bg-stone-900/90 hover:bg-stone-600/90 transition-all text-white rounded-xl font-bold' onClick={toggleTimer}>{isRunning ? 'Pause Timer' : 'Resume Timer'}</button>}
                {hasStarted && !timeUp && <button className='px-5 py-4 bg-red-900/90 hover:bg-red-600/90 transition-all text-white rounded-xl font-bold' onClick={stopTimer}>Stop Timer</button>}
            </div>
        </div>
    );
};

export default Timer;
