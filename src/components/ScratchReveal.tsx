import React, { useRef, useEffect, useState } from 'react';

interface ScratchRevealProps {
  content: React.ReactNode;
  onReveal: () => void;
  width?: number;
  height?: number;
}

export function ScratchReveal({ content, onReveal, width = 300, height = 100 }: ScratchRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number, y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill with a decorative gift box pattern
    // Background (Box color)
    ctx.fillStyle = '#ec4899'; // pink-500
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Pattern (small dots for texture)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (let i = 0; i < canvas.width; i += 10) {
      for (let j = 0; j < canvas.height; j += 10) {
        ctx.beginPath();
        ctx.arc(i, j, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Horizontal Ribbon
    ctx.fillStyle = '#be185d'; // pink-700
    ctx.fillRect(0, canvas.height / 2 - 20, canvas.width, 40);
    
    // Vertical Ribbon
    ctx.fillRect(canvas.width / 2 - 20, 0, 40, canvas.height);
    
    // Ribbon Borders
    ctx.strokeStyle = '#9d174d'; // darker pink
    ctx.lineWidth = 2;
    ctx.strokeRect(canvas.width / 2 - 20, 0, 40, canvas.height);
    ctx.strokeRect(0, canvas.height / 2 - 20, canvas.width, 40);

    // Bow (Center)
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.quadraticCurveTo(canvas.width / 2 - 30, canvas.height / 2 - 40, canvas.width / 2 - 40, canvas.height / 2 - 10);
    ctx.quadraticCurveTo(canvas.width / 2 - 30, canvas.height / 2 + 10, canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = '#f472b6';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.quadraticCurveTo(canvas.width / 2 + 30, canvas.height / 2 - 40, canvas.width / 2 + 40, canvas.height / 2 - 10);
    ctx.quadraticCurveTo(canvas.width / 2 + 30, canvas.height / 2 + 10, canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = '#f472b6';
    ctx.fill();
    ctx.stroke();

    // Center knot
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#be185d';
    ctx.fill();
    ctx.stroke();
    
    // Add text overlay on the scratch cover
    ctx.font = 'bold 16px "Inter", sans-serif';
    ctx.fillStyle = '#fdf2f8'; // pink-50
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Text shadow
    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    
    ctx.fillText('Scratch to', canvas.width / 4, canvas.height / 4);
    ctx.fillText('Reveal', canvas.width * 3 / 4, canvas.height * 3 / 4);
    
    ctx.shadowColor = 'transparent';

    // Add decorative border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

  }, [width, height]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      lastPoint.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !canvasRef.current || isRevealed) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx || !lastPoint.current) return;

    const rect = canvas.getBoundingClientRect();
    const currentPoint = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 30;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();

    lastPoint.current = currentPoint;

    // Check if revealed enough
    checkReveal();
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
    lastPoint.current = null;
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    const totalPixels = pixels.length / 4;
    const transparentPercentage = (transparentPixels / totalPixels) * 100;

    if (transparentPercentage > 50 && !isRevealed) {
      setIsRevealed(true);
      onReveal();
      // Animate canvas fade out
      canvas.style.transition = 'opacity 0.5s ease-out';
      canvas.style.opacity = '0';
      setTimeout(() => {
        canvas.style.display = 'none';
      }, 500);
    }
  };

  return (
    <div className="relative inline-block" style={{ width, height }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {content}
      </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onPointerDown={handlePointerDown}
        onPointerMove={scratch}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="absolute inset-0 cursor-pointer touch-none shadow-lg rounded-lg"
      />
    </div>
  );
}
