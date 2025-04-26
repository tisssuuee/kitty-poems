import KittyDecoration from "../../kitty-decoration";
import "./index.css"
import { PropsWithChildren, useEffect, useRef } from "react"

export const AnimatedBackground = ({ children }: PropsWithChildren) => {
  const interactiveRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const circle = interactiveRef.current;
    if (!circle) return;

    let posX = window.innerWidth / 2;
    let posY = window.innerHeight / 2;
    let targetX = posX;
    let targetY = posY;
    let animationId: number;
    let isAnimating = false;

    const handleMouseMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!isAnimating) {
        isAnimating = true;
        animationId = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      const dx = targetX - posX;
      const dy = targetY - posY;

      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        isAnimating = false;
        return;
      }

      posX += dx / 20;
      posY += dy / 20;

      circle.style.transform = `translate(${Math.round(posX)}px, ${Math.round(posY)}px)`;
      animationId = requestAnimationFrame(animate);
    };

    circle.style.transform = `translate(${posX}px, ${posY}px)`;

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="min-h-screen gradient-bg">
      <main className="gradients-container">
        <div className='g1'></div>
        <div className='g2'></div>
        <div className='g3'></div>
        <div className='g4'></div>
        <div className='g5'></div>
        <div className='interactive' ref={interactiveRef}></div>
      </main>
      <div className="grain-overlay opacity-40" />
      <div className="fixed top-0 left-0 size-full z-20" draggable="false">
        {children}
      </div>
    </div>
  )
}
