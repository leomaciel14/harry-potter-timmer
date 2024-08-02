import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OpeningScreen.css';

const OpeningScreen = ({ onStart }) => {
    const navigate = useNavigate();
    const [isOuterButtonVisible, setOuterButtonVisible] = useState(true);
    const [isInnerButtonVisible, setInnerButtonVisible] = useState(true);

    let flag = 1;

    const openEnvelopeOnHover = () => {
        const envelopeTop = document.getElementById('top');
        const letter = document.getElementById('contact');
        const left = document.getElementById('left');
        const bottomRight = document.getElementById('bot-r');

        envelopeTop.classList.remove("close");
        envelopeTop.classList.add("open");
        pullOutPartial();

        function pullOutPartial() {
            letter.classList.remove("in");
            letter.classList.add("out-partial");
            letter.style.zIndex = 30;
            envelopeTop.style.zIndex = 0;
            left.style.zIndex = 10;
            bottomRight.style.zIndex = 10;
        }
    };

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

    useEffect(() => {
        const envelope = document.getElementById('envelope');
        const envelopeTop = document.getElementById('top');

        function closeEnvelopeOnHover() {
            if (flag === 1) {
                putIn();
                envelopeTop.classList.remove('open');
                envelopeTop.classList.add('close');
            } else {
                envelope.removeEventListener('mouseout', closeEnvelopeOnHover);
            }
        }

        function putIn() {
            const letter = document.getElementById('contact');
            letter.classList.remove("out-partial");
            letter.classList.add("close");
            letter.style.zIndex = 5;
            envelopeTop.style.zIndex = 10;
            const left = document.getElementById('left');
            const bottomRight = document.getId('bot-r');
            left.style.zIndex = 10;
            bottomRight.style.zIndex = 10;
        }

        envelopeTop.classList.add("close");

        envelope.addEventListener('mouseover', openEnvelopeOnHover);
        envelope.addEventListener('mouseout', closeEnvelopeOnHover);

        return () => {
            envelope.removeEventListener('mouseover', openEnvelopeOnHover);
            envelope.removeEventListener('mouseout', closeEnvelopeOnHover);
        };
    }, []);

    const handleOuterButtonClick = () => {

        const letterIn = document.getElementById('letter-in');
        letterIn.classList.add('animate');
        setButtonVisible(false);
    };

    const handleInnerButtonClick = () => {
        const letterIn = document.getElementById('letter-in');
        letterIn.classList.add('animate');

        const envelope = document.getElementById('envelope');
        const envelopeTop = document.getElementById('top');
        const letter = document.getElementById('contact');
        const left = document.getElementById('left');
        const bottomRight = document.getElementById('bot-r');

        flag = 0;

        function closeEnvelopeOnHover() {
            if (flag === 1) {
                putIn();
                envelopeTop.classList.remove('open');
                envelopeTop.classList.add('close');
            } else {
                envelope.removeEventListener('mouseout', closeEnvelopeOnHover);
            }
        }

        function putIn() {
            letter.classList.remove("out-partial");
            letter.classList.add("close");
            letter.style.zIndex = 5;
            envelopeTop.style.zIndex = 10;
            left.style.zIndex = 10;
            bottomRight.style.zIndex = 10;
        }

        closeEnvelopeOnHover();
        letter.classList.add('pull');
        letter.addEventListener('animationend', function () {
            letter.style.zIndex = 25;
            left.style.zIndex = 0;
            bottomRight.style.zIndex = 0;
            envelopeTop.style.zIndex = 0;
            letter.classList.add('put');
            letter.addEventListener('animationend', function () {
                letter.style.transition = 'none';
                letter.classList.add('final');
                letter.classList.remove('put');
                letter.classList.remove('pull');
                envelope.classList.add('no-interaction'); // Adiciona a classe que desabilita a interação
                envelope.style.cursor = 'default';
            });
        });

        envelope.removeEventListener('mouseover', openEnvelopeOnHover);
        envelope.removeEventListener('mouseout', closeEnvelopeOnHover);
        setInnerButtonVisible(false);
    };

    return (
        <div className="opening-screen w-full h-screen bg-gradient-to-b from-indigo-800 to-blue-950 flex m-0 p-0">
            <audio id="background-music" src="A Journey to Hogwarts.mp3" loop></audio>
            <div className='fixed top-0 w-10 h-10 z-50 p-10 text-white text-center'>
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
            <img src="stars.webp" alt="" className='w-screen h-screen absolute' />
            <div className='flex flex-col items-center justify-center -translate-y-32 w-full h-full'>
                <h1 id='focus-in-expand-fwd' className='text-white text-8xl text-center p-5'>Desafios do <br /> Mundo Mágico:</h1>
                <p id='text-focus-in' className='text-white text-3xl text-center bluu-next-bolditalic '>Prove que Você Não é um Trouxa!</p>
                {isOuterButtonVisible && (
                    <button id='btn-in' onClick={handleOuterButtonClick} className='mt-12 px-5 py-2 border-2 border-white/40 rounded-full text-white/50 text-xl hover:text-white hover:border-white hover:scale-105 transition-all'>Continuar</button>
                )}
            </div>

            <div id='letter-in' className='absolute w-full h-2/3 flex items-center justify-center z-50 -translate-y-full'>
                <div className='envelope' id='envelope'>
                    <div className='cover top' id='top'>
                        <div className='selo'></div>
                    </div>
                    <div className='cover bot-r' id='bot-r'></div>
                    <div className='cover left' id='left'></div>
                    <div className='letter' id='contact'>
                        {isInnerButtonVisible && (
                            <button onClick={handleInnerButtonClick} className="px-4 py-2">
                                Clique para ler
                            </button>
                        )}
                        <div className='w-80 flex flex-col items-center justify-center m-auto'>
                            <div>
                                <a href="/phase1" className='cursor-pointer'>
                                    <p className='text-black text-2xl text-center font-normal mt-4'>Bem-vindo ao Mundo Mágico, jovem bruxo!</p>
                                    <p className='text-black text-sm text-center font-normal mt-3'>Para acessar o poderoso Vira-Tempo e controlar o tempo, você deve primeiro provar que não é um trouxa. Enfrente os desafios mágicos que se seguem e mostre sua habilidade e astúcia.</p>
                                    <p className='text-black text-base text-center font-normal mt-2'>Boa sorte!</p>
                                    <button className='bg-[#cdb373] px-4 py-2 text-sm uppercase mt-2 hover:bg-[#a08c59] cursor-pointer'>Aceito o desafio!</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='absolute bottom-0 w-full overflow-hidden z-0'>
                <div className='relative'>
                    <img id='mountain4' src="montanhas-2.webp" alt="" className='h-fit bg-contain bg-center overflow-hidden absolute  opacity-20' />
                    <img id='mountain2' src="montanhas-2.webp" alt="" className='h-fit bg-contain bg-center overflow-hidden  opacity-40' />
                    <img id='mountain2' src="montanhas-2.webp" alt="" className='h-fit bg-contain bg-center overflow-hidden absolute  opacity-50' />
                </div>
                <div className='bg-[#0a0305]  opacity-50  h-72'> </div>
            </div>
            <div className='absolute bottom-0  w-full'>
                <img id='' src="trem-parado.webp" alt="" className='h-fit bg-contain bg-center relative overflow-hidden z-10' />
                <div className='bg-[#0a0305]  h-64'> </div>
            </div>
            <div className='absolute bottom-0 w-full overflow-hidden z-20'>
                <div className='relative'>
                    <img id='mountain1' src="montanhas.webp" alt="" className='h-fit bg-contain bg-center overflow-hidden absolute' />
                    <img id='mountain2' src="montanhas.webp" alt="" className='h-fit bg-contain bg-center overflow-hidden absolute' />
                    <img id='mountain1' src="montanhas.webp" alt="" className='h-fit bg-contain bg-center overflow-hidden' />
                </div>
                <div className='bg-[#0a0305] h-64'> </div>
            </div>
        </div>
    );
};

export default OpeningScreen;
