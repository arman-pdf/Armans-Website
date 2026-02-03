import React, { useEffect, useRef } from 'react';

/**
 * FloatingParticles Component
 *
 * Purpose: Creates floating environmental particles (leaves, droplets, sparkles) for hero section
 * Placement: Behind hero section content, above background
 * Performance: Canvas-based with requestAnimationFrame, optimized for 60fps
 *
 * Features:
 * - Multiple particle types (circles, leaves, sparkles)
 * - Physics-based floating animation
 * - Environmental color palette
 * - Responsive particle density
 * - Mouse interaction (optional)
 *
 * Props:
 * - particleCount: number of particles (default: 50)
 * - interactive: enable mouse interaction (default: false)
 * - theme: 'environmental' | 'minimal' (default: 'environmental')
 */
const FloatingParticles = ({
  particleCount = 50,
  interactive = false,
  theme = 'environmental'
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking for interactive mode
    const handleMouseMove = (e) => {
      if (!interactive) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particle class
    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height; // Start at random position
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -50;
        this.size = Math.random() * 25 + 25; // Larger and more uniform: 25-50px
        this.speedY = Math.random() * 0.3 + 0.15;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.4 + 0.5; // More visible: 0.5-0.9
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;

        // Environmental particle types with colors
        const particleTypes = [
          { type: 'leaf', color: { r: 34, g: 197, b: 94 } },      // Bright green leaf
          { type: 'water', color: { r: 14, g: 165, b: 233 } },    // Sky blue water
          { type: 'recycle', color: { r: 16, g: 185, b: 129 } },  // Emerald recycle
          { type: 'tree', color: { r: 22, g: 163, b: 74 } },      // Forest green
          { type: 'earth', color: { r: 59, g: 130, b: 246 } },    // Blue earth
          { type: 'sun', color: { r: 251, g: 191, b: 36 } },      // Golden sun
          { type: 'wind', color: { r: 6, g: 182, b: 212 } },      // Cyan wind
          { type: 'mountain', color: { r: 100, g: 116, b: 139 } } // Slate mountain
        ];

        const selected = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        this.particleType = selected.type;
        this.color = `rgba(${selected.color.r}, ${selected.color.g}, ${selected.color.b}, ${this.opacity})`;
      }

      update() {
        // Move particle
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5;
        this.rotation += this.rotationSpeed;

        // Mouse interaction
        if (interactive && mouse.x !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= Math.cos(angle) * force * 2;
            this.y -= Math.sin(angle) * force * 2;
          }
        }

        // Reset if out of bounds
        if (this.y > canvas.height + 10) {
          this.reset();
        }
        if (this.x < -10 || this.x > canvas.width + 10) {
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;

        const s = this.size;

        switch(this.particleType) {
          case 'leaf':
            // Detailed leaf shape
            ctx.beginPath();
            ctx.moveTo(0, -s);
            ctx.quadraticCurveTo(s * 0.6, -s * 0.3, s * 0.4, s * 0.5);
            ctx.quadraticCurveTo(0, s * 0.3, 0, s * 0.8);
            ctx.quadraticCurveTo(0, s * 0.3, -s * 0.4, s * 0.5);
            ctx.quadraticCurveTo(-s * 0.6, -s * 0.3, 0, -s);
            ctx.fill();
            // Leaf vein
            ctx.beginPath();
            ctx.moveTo(0, -s * 0.8);
            ctx.lineTo(0, s * 0.6);
            ctx.stroke();
            break;

          case 'water':
            // Water droplet
            ctx.beginPath();
            ctx.moveTo(0, -s);
            ctx.quadraticCurveTo(s * 0.5, -s * 0.5, s * 0.5, s * 0.2);
            ctx.quadraticCurveTo(s * 0.5, s * 0.8, 0, s);
            ctx.quadraticCurveTo(-s * 0.5, s * 0.8, -s * 0.5, s * 0.2);
            ctx.quadraticCurveTo(-s * 0.5, -s * 0.5, 0, -s);
            ctx.fill();
            // Highlight
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
            ctx.beginPath();
            ctx.arc(-s * 0.2, -s * 0.4, s * 0.2, 0, Math.PI * 2);
            ctx.fill();
            break;

          case 'recycle':
            // Recycle symbol (three arrows)
            ctx.lineWidth = s * 0.15;
            for (let i = 0; i < 3; i++) {
              ctx.save();
              ctx.rotate((Math.PI * 2 / 3) * i);
              ctx.beginPath();
              ctx.arc(0, 0, s * 0.6, -Math.PI / 6, Math.PI / 3);
              ctx.stroke();
              // Arrow head
              ctx.beginPath();
              ctx.moveTo(s * 0.3, s * 0.5);
              ctx.lineTo(s * 0.5, s * 0.3);
              ctx.lineTo(s * 0.2, s * 0.3);
              ctx.fill();
              ctx.restore();
            }
            break;

          case 'tree':
            // Simple tree
            // Trunk
            ctx.fillRect(-s * 0.1, s * 0.2, s * 0.2, s * 0.5);
            // Foliage (three circles)
            ctx.beginPath();
            ctx.arc(0, -s * 0.3, s * 0.4, 0, Math.PI * 2);
            ctx.arc(-s * 0.3, 0, s * 0.35, 0, Math.PI * 2);
            ctx.arc(s * 0.3, 0, s * 0.35, 0, Math.PI * 2);
            ctx.fill();
            break;

          case 'earth':
            // Earth/globe
            ctx.beginPath();
            ctx.arc(0, 0, s * 0.7, 0, Math.PI * 2);
            ctx.fill();
            // Continents (simplified)
            ctx.fillStyle = `rgba(34, 197, 94, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(-s * 0.2, -s * 0.2, s * 0.3, 0, Math.PI * 2);
            ctx.arc(s * 0.3, s * 0.1, s * 0.25, 0, Math.PI * 2);
            ctx.fill();
            break;

          case 'sun':
            // Sun with rays
            ctx.beginPath();
            ctx.arc(0, 0, s * 0.4, 0, Math.PI * 2);
            ctx.fill();
            // Rays
            for (let i = 0; i < 8; i++) {
              const angle = (Math.PI * 2 / 8) * i;
              const x1 = Math.cos(angle) * s * 0.5;
              const y1 = Math.sin(angle) * s * 0.5;
              const x2 = Math.cos(angle) * s * 0.8;
              const y2 = Math.sin(angle) * s * 0.8;
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.lineWidth = s * 0.1;
              ctx.stroke();
            }
            break;

          case 'wind':
            // Wind lines
            ctx.lineWidth = s * 0.1;
            for (let i = 0; i < 3; i++) {
              ctx.beginPath();
              ctx.arc(s * 0.2, (i - 1) * s * 0.3, s * 0.4, Math.PI, Math.PI * 1.5);
              ctx.stroke();
            }
            break;

          case 'mountain':
            // Mountain peaks
            ctx.beginPath();
            ctx.moveTo(-s * 0.8, s * 0.5);
            ctx.lineTo(-s * 0.3, -s * 0.5);
            ctx.lineTo(0, s * 0);
            ctx.lineTo(s * 0.4, -s * 0.7);
            ctx.lineTo(s * 0.8, s * 0.5);
            ctx.closePath();
            ctx.fill();
            // Snow cap
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
            ctx.beginPath();
            ctx.moveTo(s * 0.4, -s * 0.7);
            ctx.lineTo(s * 0.3, -s * 0.4);
            ctx.lineTo(s * 0.5, -s * 0.4);
            ctx.closePath();
            ctx.fill();
            break;
        }

        ctx.restore();
      }
    }

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, interactive, theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default FloatingParticles;
