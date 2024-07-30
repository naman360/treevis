import { useEffect, useRef } from "react";

const TreeVisualiser = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    canvasRef.current!.width = window.innerWidth;
    canvasRef.current!.height = window.innerHeight;
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default TreeVisualiser;
