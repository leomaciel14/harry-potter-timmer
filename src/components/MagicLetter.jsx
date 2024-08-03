import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MagicLetter = ({ onStart }) => {
    const navigate = useNavigate();
    const [isOuterButtonVisible, setOuterButtonVisible] = useState(true);
    const [isInnerButtonVisible, setInnerButtonVisible] = useState(true);
    const [startClosingAnimation, setStartClosingAnimation] = useState(false);

    const handleLinkClick = (e) => {
        e.preventDefault();
        setStartClosingAnimation(true);

        setTimeout(() => {
            navigate("/phase1");
        }, 2000);
    };

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
            const bottomRight = document.getElementById('bot-r');
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
        setOuterButtonVisible(false);
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
        <div className="magic-letter">
            <div className='flex flex-col items-center justify-center -translate-y-32 w-full h-full'>
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

            {!isInnerButtonVisible && (
                <div id="linkDiv" className="w-full h-dvh absolute z-50 bg-none">
                    <a href="#" onClick={handleLinkClick} className='w-full h-dvh'>
                        <button className='w-full h-dvh'> </button>
                    </a>
                </div>
            )}

            <img id='transition-left' src="left.png" alt="" className={`fixed w-full left-0 h-dvh overflow-hidden ${startClosingAnimation ? 'closing' : ''}`} />
            <img id='transition-right' src="right.png" alt="" className={`fixed w-full right-0 h-dvh overflow-hidden ${startClosingAnimation ? 'closing' : ''}`} />
        </div>
    );
};

export default MagicLetter;
