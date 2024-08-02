import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Phase2 = () => {
    const navigate = useNavigate();
    const numberOfKeys = 15; // Número de chaves que você quer criar
    const correctKeyId = 'key-2'; // ID da chave correta

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
            if (key.id === correctKeyId) {
                alert('Você encontrou a chave correta! A porta se abre.');
                document.getElementById('door').textContent = '🚪🔓';
                setTimeout(() => {
                    navigate('/timer');
                }, 1000); // 1 segundo antes de navegar para o timer
            } else {
                key.style.display = 'none'; // Remover chave errada
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
        <div id="phase-2" className='w-full h-dvh bg-yellow-50 relative'>
            <div id="door" className='text-6xl flex items-center justify-center w-full h-full'>🚪</div>
            <div id="keys-container" className='absolute inset-0'>
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
    );
};

export default Phase2;
