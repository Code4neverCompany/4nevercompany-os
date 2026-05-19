'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Game constants
const GRID_SIZE = 20;
const CELL_SIZE = 25;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 2;
const POINTS_PER_FOOD = 10;

type Position = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface SnakeSegment {
  x: number;
  y: number;
}

type GameState = 'menu' | 'playing' | 'paused' | 'gameover';

// Sound generation using Web Audio API
const useSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playEat = useCallback(() => {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  }, [getAudioContext]);

  const playGameOver = useCallback(() => {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.5);
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);
  }, [getAudioContext]);

  const playMove = useCallback(() => {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.type = 'triangle';
    
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  }, [getAudioContext]);

  return { playEat, playGameOver, playMove };
};

// Generate random food position
const generateFood = (snake: SnakeSegment[]): Position => {
  let newFood: Position;
  do {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  return newFood;
};

// Main Snake Game Component
export default function SnakeGame() {
  const router = useRouter();
  const { playEat, playGameOver, playMove } = useSound();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [gameState, setGameState] = useState<GameState>('menu');
  const [snake, setSnake] = useState<SnakeSegment[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [nextDirection, setNextDirection] = useState<Direction>('RIGHT');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [showParticles, setShowParticles] = useState<Position[]>([]);
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Background music
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/snake/audio/game-music.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
  }, []);

  // Play/pause music based on game state
  useEffect(() => {
    if (audioRef.current) {
      if (gameState === 'playing') {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [gameState]);

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('snakeHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Save high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  }, [score, highScore]);

  // Game loop
  const moveSnake = useCallback(() => {
    setSnake(currentSnake => {
      const head = currentSnake[0];
      let newHead: SnakeSegment;

      switch (nextDirection) {
        case 'UP':
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case 'DOWN':
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case 'LEFT':
          newHead = { x: head.x - 1, y: head.y };
          break;
        case 'RIGHT':
          newHead = { x: head.x + 1, y: head.y };
          break;
      }

      // Check wall collision
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        playGameOver();
        setGameState('gameover');
        return currentSnake;
      }

      // Check self collision
      if (currentSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        playGameOver();
        setGameState('gameover');
        return currentSnake;
      }

      // Check food collision
      const ateFood = newHead.x === food.x && newHead.y === food.y;

      if (ateFood) {
        playEat();
        setScore(prev => prev + POINTS_PER_FOOD);
        setFood(generateFood([...currentSnake, newHead]));
        setShowParticles([...showParticles, { ...food }]);
        setTimeout(() => setShowParticles([]), 500);
        
        // Level up every 5 food
        if ((score + POINTS_PER_FOOD) % 50 === 0) {
          setLevel(prev => prev + 1);
          setSpeed(prev => Math.max(50, prev - SPEED_INCREMENT));
        }
        
        return [newHead, ...currentSnake];
      }

      setDirection(nextDirection);
      return [newHead, ...currentSnake.slice(0, -1)];
    });
  }, [nextDirection, food, playEat, playGameOver, score, showParticles]);

  // Start game loop
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(moveSnake, speed);
      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      };
    }
  }, [gameState, speed, moveSnake]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'menu' || gameState === 'gameover') {
        if (e.key === 'Enter' || e.key === ' ') {
          startGame();
        }
        return;
      }

      if (e.key === 'Escape' || e.key === 'p') {
        setGameState(gameState === 'paused' ? 'playing' : 'paused');
        return;
      }

      if (gameState === 'paused') return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction !== 'DOWN') setNextDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction !== 'UP') setNextDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction !== 'RIGHT') setNextDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction !== 'LEFT') setNextDirection('RIGHT');
          break;
      }
      playMove();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, direction, playMove]);

  // Touch controls
  const handleTouchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouch = (e: React.TouchEvent) => {
    if (gameState !== 'playing') return;
    
    const touch = e.touches[0];
    if (!handleTouchStart.current) {
      handleTouchStart.current = { x: touch.clientX, y: touch.clientY };
      return;
    }

    const deltaX = touch.clientX - handleTouchStart.current.x;
    const deltaY = touch.clientY - handleTouchStart.current.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 30 && direction !== 'LEFT') setNextDirection('RIGHT');
      else if (deltaX < -30 && direction !== 'RIGHT') setNextDirection('LEFT');
    } else {
      if (deltaY > 30 && direction !== 'UP') setNextDirection('DOWN');
      else if (deltaY < -30 && direction !== 'DOWN') setNextDirection('UP');
    }

    handleTouchStart.current = null;
    playMove();
  };

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood([{ x: 10, y: 10 }]));
    setDirection('RIGHT');
    setNextDirection('RIGHT');
    setScore(0);
    setLevel(1);
    setSpeed(INITIAL_SPEED);
    setGameState('playing');
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <motion.h1
            animate={{ 
              textShadow: ['0 0 20px rgba(197,160,89,0.5)', '0 0 40px rgba(0,255,255,0.5)', '0 0 20px rgba(197,160,89,0.5)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl font-display font-bold text-gradient-gold mb-2"
          >
            🐍 SNAKE
          </motion.h1>
          <p className="text-gray-400">4neverCompany OS</p>
        </div>

        {/* Score Bar */}
        <div className="glass-card p-4 mb-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xs text-gray-400">SCORE</p>
              <p className="text-2xl font-mono text-gold">{score}</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-xs text-gray-400">HIGH</p>
              <p className="text-2xl font-mono text-cyan">{highScore}</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">LEVEL</p>
            <p className="text-2xl font-mono text-white">{level}</p>
          </div>
        </div>

        {/* Game Area */}
        <div
          ref={containerRef}
          onTouchStart={(e) => { handleTouchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
          onTouchMove={handleTouch}
          className="glass-panel p-4 relative overflow-hidden"
          style={{ aspectRatio: '1' }}
        >
          {/* Grid Background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(197,160,89,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(197,160,89,0.3) 1px, transparent 1px)
              `,
              backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
            }}
          />

          {/* Game Canvas */}
          <div
            className="relative w-full h-full"
            style={{ 
              width: GRID_SIZE * CELL_SIZE,
              height: GRID_SIZE * CELL_SIZE,
              margin: '0 auto'
            }}
          >
            {/* Food */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                boxShadow: ['0 0 10px #00FFFF', '0 0 30px #00FFFF', '0 0 10px #00FFFF']
              }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute w-5 h-5 rounded-full bg-gradient-to-br from-cyan to-cyan-dark"
              style={{
                left: food.x * CELL_SIZE + CELL_SIZE / 2 - 10,
                top: food.y * CELL_SIZE + CELL_SIZE / 2 - 10,
              }}
            />

            {/* Particles */}
            {showParticles.map((particle, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute w-4 h-4 rounded-full bg-gold"
                style={{
                  left: particle.x * CELL_SIZE + CELL_SIZE / 2 - 8,
                  top: particle.y * CELL_SIZE + CELL_SIZE / 2 - 8,
                }}
              />
            ))}

            {/* Snake */}
            {snake.map((segment, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute rounded-md"
                style={{
                  left: segment.x * CELL_SIZE + 2,
                  top: segment.y * CELL_SIZE + 2,
                  width: CELL_SIZE - 4,
                  height: CELL_SIZE - 4,
                  background: i === 0
                    ? 'linear-gradient(135deg, #C5A059 0%, #D4B06A 100%)'
                    : `linear-gradient(135deg, hsl(${40 + i * 2}, 80%, 50%) 0%, hsl(${50 + i * 2}, 80%, 40%) 100%)`,
                  boxShadow: i === 0 ? '0 0 15px rgba(197,160,89,0.8)' : 'none',
                }}
              />
            ))}
          </div>

          {/* Menu Overlay */}
          <AnimatePresence>
            {gameState === 'menu' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 glass-panel bg-surface/90 flex flex-col items-center justify-center"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-8xl mb-6"
                >
                  🐍
                </motion.div>
                <h2 className="text-3xl font-display font-bold text-gradient-gold mb-4">
                  SNAKE GAME
                </h2>
                <p className="text-gray-400 mb-8 text-center px-8">
                  Use WASD or Arrow Keys to move
                  <br />Touch swipe on mobile
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="px-8 py-4 bg-gold text-surface font-bold rounded-lg text-lg gold-glow"
                >
                  START GAME
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pause Overlay */}
          <AnimatePresence>
            {gameState === 'paused' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 glass-panel bg-surface/90 flex flex-col items-center justify-center"
              >
                <h2 className="text-4xl font-display font-bold text-gradient-cyan mb-6">
                  PAUSED
                </h2>
                <p className="text-gray-400 mb-8">Press ESC or P to resume</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGameState('playing')}
                  className="px-8 py-4 bg-cyan text-surface font-bold rounded-lg text-lg cyan-glow"
                >
                  RESUME
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game Over Overlay */}
          <AnimatePresence>
            {gameState === 'gameover' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 glass-panel bg-surface/95 flex flex-col items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="text-8xl mb-6"
                >
                  💀
                </motion.div>
                <h2 className="text-4xl font-display font-bold text-red-500 mb-4">
                  GAME OVER
                </h2>
                <div className="text-center mb-8">
                  <p className="text-gray-400">Final Score</p>
                  <p className="text-6xl font-mono text-gold">{score}</p>
                  {score >= highScore && score > 0 && (
                    <p className="text-cyan mt-2">🏆 NEW HIGH SCORE!</p>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="px-8 py-4 bg-gold text-surface font-bold rounded-lg text-lg gold-glow mb-4"
                >
                  PLAY AGAIN
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/')}
                  className="px-6 py-3 glass-card text-gray-300 font-medium rounded-lg"
                >
                  ← Back to OS
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls Help */}
        <div className="glass-card p-4 mt-4 text-center text-sm text-gray-400">
          <p>WASD / Arrow Keys to move • ESC / P to pause • Touch swipe on mobile</p>
        </div>
      </motion.div>
    </div>
  );
}