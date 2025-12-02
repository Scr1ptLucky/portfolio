import { useState, useRef, useEffect } from "react";

interface Pipe {
  id: number;
  x: number;
  topHeight: number;
}

export function FlappyBird() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gameState = useRef({
    birdY: 150,
    birdVelocity: 0,
    pipes: [] as Pipe[],
    score: 0,
    gameOver: false,
    pipeCounter: 0,
  });

  const BIRD_SIZE = 20;
  const PIPE_WIDTH = 60;
  const PIPE_GAP = 120;
  const GRAVITY = 0.6;
  const JUMP_STRENGTH = -12;
  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 500;

  // Handle click to jump
  useEffect(() => {
    const handleClick = () => {
      if (!gameActive && !gameOver) {
        setGameActive(true);
        setGameOver(false);
        gameState.current.gameOver = false;
        gameState.current.birdY = 150;
        gameState.current.birdVelocity = 0;
        gameState.current.pipes = [];
        gameState.current.score = 0;
        setScore(0);
      } else if (gameActive && !gameState.current.gameOver) {
        gameState.current.birdVelocity = JUMP_STRENGTH;
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [gameActive]);

  // Game loop
  useEffect(() => {
    if (!gameActive || gameState.current.gameOver) return;

    const gameLoop = setInterval(() => {
      const state = gameState.current;

      // Apply gravity
      state.birdVelocity += GRAVITY;
      state.birdY += state.birdVelocity;

      // Check bounds
      if (state.birdY + BIRD_SIZE > CANVAS_HEIGHT || state.birdY < 0) {
        state.gameOver = true;
        setGameOver(true);
        setGameActive(false);
        return;
      }

      // Generate pipes
      state.pipeCounter++;
      if (state.pipeCounter > 100) {
        const topHeight = Math.random() * (CANVAS_HEIGHT - PIPE_GAP - 100) + 50;
        state.pipes.push({
          id: Date.now(),
          x: CANVAS_WIDTH,
          topHeight,
        });
        state.pipeCounter = 0;
      }

      // Move pipes
      state.pipes = state.pipes.filter((pipe) => {
        pipe.x -= 5;

        // Check collision
        if (
          state.birdY < pipe.topHeight + 10 ||
          state.birdY + BIRD_SIZE > pipe.topHeight + PIPE_GAP - 10
        ) {
          if (
            state.birdY < pipe.topHeight + 50 &&
            state.birdY + BIRD_SIZE > pipe.topHeight - 50 &&
            state.birdY < pipe.topHeight + PIPE_GAP + 50 &&
            state.birdY + BIRD_SIZE > pipe.topHeight + PIPE_GAP - 50
          ) {
            // Bird is in the gap
            return true;
          }
          if (
            state.birdY < pipe.topHeight ||
            state.birdY + BIRD_SIZE > pipe.topHeight + PIPE_GAP
          ) {
            state.gameOver = true;
            setGameOver(true);
            setGameActive(false);
            return false;
          }
        }

        // Score point
        if (pipe.x === CANVAS_WIDTH / 2 - PIPE_WIDTH / 2) {
          state.score++;
          setScore(state.score);
        }

        return pipe.x > -PIPE_WIDTH;
      });
    }, 30);

    return () => clearInterval(gameLoop);
  }, [gameActive]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas with sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, "#87CEEB");
    gradient.addColorStop(1, "#E0F6FF");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw ground
    ctx.fillStyle = "#90EE90";
    ctx.fillRect(0, CANVAS_HEIGHT - 40, CANVAS_WIDTH, 40);
    ctx.strokeStyle = "#228B22";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, CANVAS_HEIGHT - 40, CANVAS_WIDTH, 40);

    // Draw pipes
    gameState.current.pipes.forEach((pipe) => {
      // Top pipe
      ctx.fillStyle = "#2ECC71";
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
      ctx.strokeStyle = "#27AE60";
      ctx.lineWidth = 2;
      ctx.strokeRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);

      // Bottom pipe
      ctx.fillStyle = "#2ECC71";
      ctx.fillRect(
        pipe.x,
        pipe.topHeight + PIPE_GAP,
        PIPE_WIDTH,
        CANVAS_HEIGHT - pipe.topHeight - PIPE_GAP
      );
      ctx.strokeStyle = "#27AE60";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        pipe.x,
        pipe.topHeight + PIPE_GAP,
        PIPE_WIDTH,
        CANVAS_HEIGHT - pipe.topHeight - PIPE_GAP
      );
    });

    // Draw bird
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.arc(CANVAS_WIDTH / 2, gameState.current.birdY, BIRD_SIZE, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#FFA500";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw eyes
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(CANVAS_WIDTH / 2 + 5, gameState.current.birdY - 5, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  return (
    <div className="w-full h-full bg-gradient-to-b from-blue-300 to-blue-100 flex flex-col items-center justify-center p-4 gap-4">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border-4 border-gray-800 rounded-lg shadow-lg cursor-pointer bg-sky-200"
        onClick={() => {
          if (!gameActive && !gameOver) {
            setGameActive(true);
          } else if (gameActive && !gameState.current.gameOver) {
            gameState.current.birdVelocity = JUMP_STRENGTH;
          }
        }}
      />

      <div className="text-center">
        <div className="text-2xl font-bold text-gray-800">Pontuação: {score}</div>
        {!gameActive && !gameOver && (
          <div className="text-sm text-gray-600 mt-2">Clique para começar!</div>
        )}
        {gameOver && (
          <div className="text-sm text-red-600 mt-2">Game Over! Clique para recomeçar.</div>
        )}
        {gameActive && !gameState.current.gameOver && (
          <div className="text-sm text-gray-600 mt-2">Clique para pular!</div>
        )}
      </div>
    </div>
  );
}
