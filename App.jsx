import React, { useState, useEffect } from 'react';
import { RotateCcw, Zap, Radio } from 'lucide-react';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [animate, setAnimate] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);

  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 500);
      if (result.winner !== 'Draw') {
        setScores(prev => ({ ...prev, [result.winner]: prev[result.winner] + 1 }));
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
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Starfield Background */}
      <div className="absolute inset-0 opacity-60">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* Upside Down Portal Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="portal-effect"></div>
      </div>

      {/* Scanlines Effect */}
      <div className="absolute inset-0 scanlines pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header with Stranger Things Aesthetic */}
        <div className="text-center mb-8 relative">
          <div className={`${glitchEffect ? 'glitch' : ''}`}>
            <h1 className="text-6xl font-bold mb-2 drop-shadow-lg tracking-wider"
                style={{
                  color: '#ff0000',
                  textShadow: '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #8b0000',
                  fontFamily: '"Courier New", monospace',
                  letterSpacing: '0.1em'
                }}>
              TIC TAC TOE
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-red-500 animate-pulse">
            <Radio className="w-5 h-5" />
            <p className="text-lg tracking-widest" style={{ fontFamily: 'monospace' }}>
              ENTER THE UPSIDE DOWN
            </p>
          </div>
          
          {/* Flickering lights effect */}
          <div className="flex justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full animate-flicker"
                style={{
                  backgroundColor: '#ff0000',
                  boxShadow: '0 0 10px #ff0000',
                  animationDelay: `${i * 0.2}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Score Board with Retro Monitor Style */}
        <div className="relative mb-6 border-4 border-red-900 rounded-lg overflow-hidden"
             style={{
               backgroundColor: 'rgba(0, 0, 0, 0.85)',
               boxShadow: '0 0 20px rgba(255, 0, 0, 0.5), inset 0 0 20px rgba(255, 0, 0, 0.1)'
             }}>
          <div className="absolute inset-0 opacity-10 bg-gradient-to-b from-red-500 to-transparent pointer-events-none"></div>
          
          <div className="p-6 relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-red-500 animate-pulse" />
              <h2 className="text-xl font-bold text-red-500 tracking-widest" style={{ fontFamily: 'monospace' }}>
                DIMENSION TRACKER
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 rounded border-2 border-cyan-500 bg-black/50"
                   style={{ boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)' }}>
                <div className="text-3xl font-bold text-cyan-400" style={{ textShadow: '0 0 10px #00ffff' }}>X</div>
                <div className="text-3xl font-bold text-cyan-300 font-mono">{scores.X}</div>
              </div>
              <div className="text-center p-3 rounded border-2 border-gray-600 bg-black/50">
                <div className="text-xs font-medium text-gray-400 mb-1 tracking-widest">RIFTS</div>
                <div className="text-3xl font-bold text-gray-300 font-mono">{scores.draws}</div>
              </div>
              <div className="text-center p-3 rounded border-2 border-red-500 bg-black/50"
                   style={{ boxShadow: '0 0 10px rgba(255, 0, 0, 0.3)' }}>
                <div className="text-3xl font-bold text-red-400" style={{ textShadow: '0 0 10px #ff0000' }}>O</div>
                <div className="text-3xl font-bold text-red-300 font-mono">{scores.O}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Board with Interstellar Portal Design */}
        <div className="relative mb-6 border-4 border-red-900 rounded-lg overflow-hidden"
             style={{
               backgroundColor: 'rgba(0, 0, 0, 0.85)',
               boxShadow: '0 0 30px rgba(255, 0, 0, 0.5), inset 0 0 30px rgba(255, 0, 0, 0.1)'
             }}>
          
          {/* Circular Portal Design Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-64 h-64 rounded-full border-4 border-red-500 animate-spin-slow"></div>
            <div className="absolute w-48 h-48 rounded-full border-4 border-cyan-500 animate-spin-reverse"></div>
            <div className="absolute w-32 h-32 rounded-full border-4 border-red-500 animate-spin-slow"></div>
          </div>

          <div className="p-6 relative z-10">
            {/* Status */}
            <div className="text-center mb-6">
              {winner ? (
                <div className={`text-2xl font-bold ${glitchEffect ? 'glitch' : ''}`}>
                  {winner === 'Draw' ? (
                    <span className="text-gray-300 tracking-widest" style={{ fontFamily: 'monospace', textShadow: '0 0 10px #666' }}>
                      DIMENSIONAL COLLAPSE
                    </span>
                  ) : (
                    <span className={winner === 'X' ? 'text-cyan-400' : 'text-red-400'}
                          style={{
                            fontFamily: 'monospace',
                            textShadow: winner === 'X' ? '0 0 20px #00ffff' : '0 0 20px #ff0000',
                            letterSpacing: '0.2em'
                          }}>
                      {winner === 'X' ? 'DIMENSION X CONQUERED' : 'DIMENSION O CONQUERED'}
                    </span>
                  )}
                </div>
              ) : (
                <div className="text-xl font-semibold tracking-widest" style={{ fontFamily: 'monospace' }}>
                  <span className="text-gray-400">CURRENT DIMENSION: </span>
                  <span className={isXNext ? 'text-cyan-400' : 'text-red-400'}
                        style={{
                          textShadow: isXNext ? '0 0 10px #00ffff' : '0 0 10px #ff0000'
                        }}>
                    {isXNext ? 'X' : 'O'}
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
                    aspect-square rounded-lg text-6xl font-bold
                    transition-all duration-200 transform
                    ${cell ? 'scale-100' : 'scale-95 hover:scale-100'}
                    ${!cell && !winner ? 'cursor-pointer' : 'cursor-default'}
                    ${!cell && !winner ? 'active:scale-90' : ''}
                    relative overflow-hidden
                  `}
                  style={{
                    backgroundColor: winningLine.includes(index) 
                      ? 'rgba(255, 0, 0, 0.3)' 
                      : 'rgba(0, 0, 0, 0.6)',
                    border: winningLine.includes(index)
                      ? '3px solid #ff0000'
                      : cell 
                        ? `3px solid ${cell === 'X' ? '#00ffff' : '#ff0000'}`
                        : '3px solid #333',
                    boxShadow: winningLine.includes(index)
                      ? '0 0 20px rgba(255, 0, 0, 0.8), inset 0 0 20px rgba(255, 0, 0, 0.3)'
                      : cell
                        ? `0 0 15px ${cell === 'X' ? 'rgba(0, 255, 255, 0.5)' : 'rgba(255, 0, 0, 0.5)'}`
                        : 'none'
                  }}
                  disabled={!!cell || !!winner}
                >
                  {/* Hover effect for empty cells */}
                  {!cell && !winner && (
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-cyan-500/20 opacity-0 hover:opacity-100 transition-opacity"></div>
                  )}
                  
                  {cell && (
                    <span className="animate-[scaleIn_0.3s_ease-out] relative z-10"
                          style={{
                            color: cell === 'X' ? '#00ffff' : '#ff0000',
                            textShadow: cell === 'X' 
                              ? '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff'
                              : '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000',
                            fontFamily: '"Courier New", monospace',
                            fontWeight: 'bold'
                          }}>
                      {cell}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons with Retro Style */}
        <div className="flex gap-3">
          <button
            onClick={resetGame}
            className="flex-1 font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border-2"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: '#00ffff',
              borderColor: '#00ffff',
              boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
              textShadow: '0 0 5px #00ffff'
            }}
          >
            <RotateCcw className="w-5 h-5" />
            NEW DIMENSION
          </button>
          <button
            onClick={resetScores}
            className="flex-1 font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 border-2"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: '#ff0000',
              borderColor: '#ff0000',
              boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
              textShadow: '0 0 5px #ff0000'
            }}
          >
            RESET PORTAL
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0) rotate(180deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .animate-flicker {
          animation: flicker 2s infinite;
        }

        .stars {
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: 780px 1207px #FFF, 1158px 1532px #FFF, 1344px 757px #FFF, 1189px 1217px #FFF;
          animation: animStar 50s linear infinite;
        }

        .stars:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: 780px 1207px #FFF, 1158px 1532px #FFF, 1344px 757px #FFF, 1189px 1217px #FFF;
        }

        .stars2 {
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: 950px 623px #FFF, 1456px 876px #FFF, 234px 1789px #FFF, 1673px 234px #FFF;
          animation: animStar 100s linear infinite;
        }

        .stars2:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: 950px 623px #FFF, 1456px 876px #FFF, 234px 1789px #FFF, 1673px 234px #FFF;
        }

        .stars3 {
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: 345px 1456px #FFF, 1567px 345px #FFF, 789px 1234px #FFF, 234px 567px #FFF;
          animation: animStar 150s linear infinite;
        }

        .stars3:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: 345px 1456px #FFF, 1567px 345px #FFF, 789px 1234px #FFF, 234px 567px #FFF;
        }

        @keyframes animStar {
          from { transform: translateY(0px); }
          to { transform: translateY(-2000px); }
        }

        .portal-effect {
          background: radial-gradient(circle at center, 
            rgba(255, 0, 0, 0.2) 0%, 
            rgba(139, 0, 0, 0.1) 25%, 
            transparent 50%);
          width: 100%;
          height: 100%;
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        .scanlines {
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
        }

        .glitch {
          animation: glitch 0.3s infinite;
        }

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin 15s linear infinite reverse;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
