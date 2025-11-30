import React, { useState, useEffect } from 'react';
import { RotateCcw, Sparkles, Heart } from 'lucide-react';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [animate, setAnimate] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      if (result.winner !== 'Draw') {
        setScores(prev => ({ ...prev, [result.winner]: prev[result.winner] + 1 }));
        // Create celebration particles
        const newParticles = Array.from({ length: 30 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 0.5
        }));
        setParticles(newParticles);
        setTimeout(() => setParticles([]), 2000);
      } else {
        setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      }
    }
  }, [board]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line };
      }
    }

    if (squares.every(square => square !== null)) {
      return { winner: 'Draw', line: [] };
    }

    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setAnimate(true);
    setTimeout(() => {
      setBoard(Array(9).fill(null));
      setIsXNext(true);
      setWinner(null);
      setWinningLine([]);
      setAnimate(false);
    }, 300);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0, draws: 0 });
    resetGame();
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4"
         style={{
           background: 'linear-gradient(135deg, #ffd1dc 0%, #ffb6c1 25%, #e6e6fa 50%, #b0c4de 75%, #add8e6 100%)'
         }}>
      
      {/* Animated Cherry Blossoms */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="cherry-blossom"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            🌸
          </div>
        ))}
      </div>

      {/* Celebration Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="celebration-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`
          }}
        >
          ✨
        </div>
      ))}

      {/* Floating Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="cloud" style={{ top: '10%', animationDuration: '25s' }}>☁️</div>
        <div className="cloud" style={{ top: '30%', animationDuration: '30s', animationDelay: '5s' }}>☁️</div>
        <div className="cloud" style={{ top: '60%', animationDuration: '35s', animationDelay: '10s' }}>☁️</div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header with Anime Style */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <h1 className="text-7xl font-black mb-2"
                style={{
                  color: '#ff1493',
                  textShadow: '4px 4px 0px #fff, 8px 8px 0px #ffb6c1, -2px -2px 0px #fff',
                  fontFamily: '"Comic Sans MS", cursive, sans-serif',
                  letterSpacing: '0.05em',
                  transform: 'rotate(-2deg)'
                }}>
              まるばつ
            </h1>
            <div className="absolute -top-4 -right-8 text-4xl animate-bounce">⭐</div>
            <div className="absolute -bottom-2 -left-8 text-3xl animate-bounce" style={{ animationDelay: '0.3s' }}>💫</div>
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-3">
            <Heart className="w-6 h-6 text-pink-500 animate-pulse" fill="currentColor" />
            <p className="text-2xl font-bold"
               style={{
                 background: 'linear-gradient(45deg, #ff1493, #ff69b4, #ffc0cb)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 fontFamily: '"Comic Sans MS", cursive'
               }}>
              Kawaii Battle Arena ♡
            </p>
            <Heart className="w-6 h-6 text-pink-500 animate-pulse" fill="currentColor" />
          </div>

          {/* Cute Decorations */}
          <div className="flex justify-center gap-3 mt-4">
            <span className="text-3xl animate-wiggle">🎀</span>
            <span className="text-3xl animate-wiggle" style={{ animationDelay: '0.2s' }}>🌟</span>
            <span className="text-3xl animate-wiggle" style={{ animationDelay: '0.4s' }}>🎀</span>
          </div>
        </div>

        {/* Score Board */}
        <div className="relative mb-6 rounded-3xl overflow-hidden backdrop-blur-sm"
             style={{
               background: 'rgba(255, 255, 255, 0.95)',
               border: '4px solid #ff69b4',
               boxShadow: '0 8px 32px rgba(255, 20, 147, 0.3), inset 0 0 20px rgba(255, 182, 193, 0.2)'
             }}>
          
          <div className="absolute inset-0 opacity-20">
            <div className="anime-pattern"></div>
          </div>

          <div className="p-6 relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-pink-500 animate-spin" style={{ animationDuration: '3s' }} />
              <h2 className="text-2xl font-black"
                  style={{
                    color: '#ff1493',
                    textShadow: '2px 2px 0px #fff',
                    fontFamily: '"Comic Sans MS", cursive'
                  }}>
                ♡ SCORE ♡
              </h2>
              <Sparkles className="w-6 h-6 text-pink-500 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-2xl relative overflow-hidden transform hover:scale-105 transition-transform cursor-pointer"
                   style={{
                     background: 'linear-gradient(135deg, #ffb6c1 0%, #ffc0cb 100%)',
                     border: '3px solid #ff69b4',
                     boxShadow: '0 4px 15px rgba(255, 105, 180, 0.4)'
                   }}>
                <div className="text-5xl font-black mb-1" style={{ color: '#ff1493', textShadow: '2px 2px 0px #fff' }}>X</div>
                <div className="text-4xl font-black" style={{ color: '#c71585' }}>{scores.X}</div>
                <div className="text-xl mt-1">🌸</div>
              </div>

              <div className="text-center p-4 rounded-2xl relative overflow-hidden"
                   style={{
                     background: 'linear-gradient(135deg, #e6e6fa 0%, #d8bfd8 100%)',
                     border: '3px solid #9370db'
                   }}>
                <div className="text-sm font-bold text-purple-600 mb-1">DRAWS</div>
                <div className="text-4xl font-black text-purple-700">{scores.draws}</div>
                <div className="text-xl mt-1">💫</div>
              </div>

              <div className="text-center p-4 rounded-2xl relative overflow-hidden transform hover:scale-105 transition-transform cursor-pointer"
                   style={{
                     background: 'linear-gradient(135deg, #add8e6 0%, #b0e0e6 100%)',
                     border: '3px solid #4682b4',
                     boxShadow: '0 4px 15px rgba(70, 130, 180, 0.4)'
                   }}>
                <div className="text-5xl font-black mb-1" style={{ color: '#1e90ff', textShadow: '2px 2px 0px #fff' }}>O</div>
                <div className="text-4xl font-black" style={{ color: '#0066cc' }}>{scores.O}</div>
                <div className="text-xl mt-1">🌊</div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="relative mb-6 rounded-3xl overflow-hidden backdrop-blur-sm"
             style={{
               background: 'rgba(255, 255, 255, 0.95)',
               border: '4px solid #ff69b4',
               boxShadow: '0 8px 32px rgba(255, 20, 147, 0.3), inset 0 0 20px rgba(255, 182, 193, 0.2)'
             }}>

          {/* Decorative corners */}
          <div className="absolute top-2 left-2 text-3xl z-20">🌸</div>
          <div className="absolute top-2 right-2 text-3xl z-20">🌸</div>
          <div className="absolute bottom-2 left-2 text-3xl z-20">🌸</div>
          <div className="absolute bottom-2 right-2 text-3xl z-20">🌸</div>

          <div className="p-6 relative z-10">
            {/* Status */}
            <div className="text-center mb-6">
              {winner ? (
                <div className="text-3xl font-black animate-bounce">
                  {winner === 'Draw' ? (
                    <span style={{ color: '#9370db', textShadow: '3px 3px 0px #fff', fontFamily: '"Comic Sans MS", cursive' }}>
                      友情の絆！ Friendship! 🤝✨
                    </span>
                  ) : (
                    <div>
                      <span style={{
                        color: winner === 'X' ? '#ff1493' : '#1e90ff',
                        textShadow: '3px 3px 0px #fff',
                        fontFamily: '"Comic Sans MS", cursive'
                      }}>
                        {winner === 'X' ? '🌸 SAKURA' : '🌊 MIZUUMI'} WINS! 
                      </span>
                      <div className="text-5xl mt-2">
                        {winner === 'X' ? '🎀' : '⚡'}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-2xl font-black" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
                  <span style={{ color: '#9370db', textShadow: '2px 2px 0px #fff' }}>Turn:</span>{' '}
                  <span style={{
                    color: isXNext ? '#ff1493' : '#1e90ff',
                    textShadow: '2px 2px 0px #fff'
                  }}>
                    {isXNext ? '🌸 SAKURA' : '🌊 MIZUUMI'}
                  </span>
                </div>
              )}
            </div>

            {/* Board Grid */}
            <div className={`grid grid-cols-3 gap-3 ${animate ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
              {board.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  className={`
                    aspect-square rounded-2xl text-7xl font-black
                    transition-all duration-300 transform
                    ${cell ? 'scale-100' : 'scale-95 hover:scale-105 hover:rotate-3'}
                    ${!cell && !winner ? 'cursor-pointer' : 'cursor-default'}
                    ${!cell && !winner ? 'active:scale-90' : ''}
                    relative overflow-hidden
                  `}
                  style={{
                    background: winningLine.includes(index)
                      ? 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)'
                      : cell
                        ? cell === 'X'
                          ? 'linear-gradient(135deg, #ffb6c1 0%, #ffc0cb 100%)'
                          : 'linear-gradient(135deg, #add8e6 0%, #b0e0e6 100%)'
                        : 'linear-gradient(135deg, #fff 0%, #f0f0f0 100%)',
                    border: winningLine.includes(index)
                      ? '4px solid #ffd700'
                      : cell
                        ? `4px solid ${cell === 'X' ? '#ff69b4' : '#4682b4'}`
                        : '4px solid #ddd',
                    boxShadow: winningLine.includes(index)
                      ? '0 0 30px rgba(255, 215, 0, 0.8), inset 0 0 30px rgba(255, 215, 0, 0.3)'
                      : cell
                        ? `0 8px 25px ${cell === 'X' ? 'rgba(255, 105, 180, 0.5)' : 'rgba(70, 130, 180, 0.5)'}`
                        : '0 4px 15px rgba(0, 0, 0, 0.1)'
                  }}
                  disabled={!!cell || !!winner}
                >
                  {/* Sparkle effect on hover */}
                  {!cell && !winner && (
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-4xl">
                      ✨
                    </div>
                  )}
                  
                  {cell && (
                    <div className="animate-[bounceIn_0.5s_ease-out] relative z-10">
                      <span style={{
                        color: cell === 'X' ? '#ff1493' : '#1e90ff',
                        textShadow: cell === 'X'
                          ? '4px 4px 0px #fff, -2px -2px 0px #ff69b4'
                          : '4px 4px 0px #fff, -2px -2px 0px #87ceeb',
                        fontWeight: '900',
                        fontFamily: '"Comic Sans MS", cursive'
                      }}>
                        {cell}
                      </span>
                      <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-30">
                        {cell === 'X' ? '🌸' : '🌊'}
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={resetGame}
            className="flex-1 font-black py-5 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-2 active:scale-95 flex items-center justify-center gap-2 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #ffb6c1 0%, #ff69b4 100%)',
              border: '4px solid #ff1493',
              color: '#fff',
              boxShadow: '0 8px 25px rgba(255, 20, 147, 0.4)',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              fontFamily: '"Comic Sans MS", cursive',
              fontSize: '1.1rem'
            }}
          >
            <RotateCcw className="w-6 h-6" />
            NEW GAME ♡
          </button>
          
          <button
            onClick={resetScores}
            className="flex-1 font-black py-5 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-2 active:scale-95 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #add8e6 0%, #4682b4 100%)',
              border: '4px solid #1e90ff',
              color: '#fff',
              boxShadow: '0 8px 25px rgba(30, 144, 255, 0.4)',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              fontFamily: '"Comic Sans MS", cursive',
              fontSize: '1.1rem'
            }}
          >
            RESET ALL ⭐
          </button>
        </div>

        {/* Cute footer message */}
        <div className="text-center mt-6">
          <p className="text-xl font-bold" style={{
            color: '#ff69b4',
            textShadow: '2px 2px 0px #fff',
            fontFamily: '"Comic Sans MS", cursive'
          }}>
            頑張って！ (Ganbare!) 💖
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounceIn {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }

        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }

        .cherry-blossom {
          position: absolute;
          font-size: 2rem;
          animation: fall linear infinite;
          opacity: 0.8;
        }

        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }

        .cloud {
          position: absolute;
          font-size: 4rem;
          animation: float-cloud linear infinite;
        }

        @keyframes float-cloud {
          0% {
            transform: translateX(-10vw);
          }
          100% {
            transform: translateX(110vw);
          }
        }

        .celebration-particle {
          position: fixed;
          font-size: 2rem;
          pointer-events: none;
          animation: celebrate 2s ease-out forwards;
          z-index: 1000;
        }

        @keyframes celebrate {
          0% {
            transform: translateY(0) scale(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-200px) scale(1.5) rotate(720deg);
            opacity: 0;
          }
        }

        .anime-pattern {
          width: 100%;
          height: 100%;
          background-image: 
            repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 182, 193, 0.3) 10px, rgba(255, 182, 193, 0.3) 20px),
            repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(173, 216, 230, 0.3) 10px, rgba(173, 216, 230, 0.3) 20px);
        }
      `}</style>
    </div>
  );
}
