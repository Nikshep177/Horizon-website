import { useEffect, useRef } from 'react';

function ShootingStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width, height;
    const shootingStars = [];
    const maxStars = 5;

    function resize() {
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    }

    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height / 2; // Start in the upper half
        this.len = (Math.random() * 80) + 40; // Length of the tail
        this.speed = (Math.random() * 6) + 3; // Speed of the star
        this.size = (Math.random() * 1.5) + 0.5; // Size of the star
        this.opacity = (Math.random() * 0.5) + 0.5; // Opacity
        this.angle = Math.PI / 4; // Angle of descent (45 degrees)
        this.velocity = {
          x: Math.cos(this.angle) * this.speed,
          y: Math.sin(this.angle) * this.speed,
        };
        this.tail = [];
        this.life = 0;
        this.maxLife = Math.random() * 100 + 50;
      }

      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.life++;

        this.tail.push({ x: this.x, y: this.y, opacity: this.opacity });
        if (this.tail.length > this.len) {
          this.tail.shift();
        }

        if (this.x > width + this.len || this.y > height + this.len || this.life > this.maxLife) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();

        for (let i = 0; i < this.tail.length; i++) {
          const tailPart = this.tail[i];
          const opacity = this.opacity * (i / this.tail.length) * 0.7;
          ctx.beginPath();
          ctx.arc(tailPart.x, tailPart.y, this.size * (i / this.tail.length), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
        }
      }
    }

    function initShootingStars() {
      for (let i = 0; i < maxStars; i++) {
        setTimeout(() => {
          shootingStars.push(new ShootingStar());
        }, i * 2000); // Stagger initial appearance
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(0, 0, 0, 0)'; // Clear with transparent background

      shootingStars.forEach(star => {
        star.update();
        star.draw();
      });

      animationId = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener('resize', resize);
    initShootingStars();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="shooting-stars-canvas" aria-hidden="true" />;
}

export default ShootingStars;
