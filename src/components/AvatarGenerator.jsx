import React, { useMemo } from 'react';
import { isAddress } from 'ethers';

// Simple seeded random number generator
const seededRandom = (seed) => {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
};

// Convert address to a numeric seed
const addressToSeed = (address) => {
  if (!address) return 0;
  const cleanAddr = address.toLowerCase().replace('0x', '');
  return parseInt(cleanAddr.slice(0, 8), 16);
};

// Generate a vibrant color
const generateColor = (random, hueShift = 0) => {
  const hue = Math.floor(random() * 360 + hueShift) % 360;
  const sat = 60 + random() * 40; // 60-100% saturation
  const light = 40 + random() * 40; // 40-80% lightness
  return `hsl(${hue}, ${sat}%, ${light}%)`;
};

const AvatarGenerator = ({ address, size = 200 }) => {
  const isValid = useMemo(() => isAddress(address), [address]);

  const art = useMemo(() => {
    if (!isValid || !address) return null;

    const seed = addressToSeed(address);
    const random = seededRandom(seed);

    // Generate background gradient
    const bgHue = Math.floor(random() * 360);
    const bgAngle = Math.floor(random() * 360);
    const color1 = `hsl(${bgHue}, 80%, 90%)`;
    const color2 = `hsl(${(bgHue + 40 + random() * 60) % 360}, 80%, 80%)`;
    const bgGradientId = `bg-grad-${seed}`;

    // Generate shapes
    const shapeCount = 5 + Math.floor(random() * 5); // 5 to 9 shapes
    const generatedShapes = [];

    for (let i = 0; i < shapeCount; i++) {
      const shapeType = ['circle', 'rect', 'triangle', 'ring'][Math.floor(random() * 4)];
      const x = random() * 100;
      const y = random() * 100;
      const scale = 20 + random() * 60;
      const rotation = random() * 360;

      // Shape gradient
      const shapeHue = (bgHue + 90 + random() * 180) % 360;
      const shapeColor1 = `hsla(${shapeHue}, 85%, 65%, ${0.4 + random() * 0.4})`;
      const shapeColor2 = `hsla(${(shapeHue + 30) % 360}, 85%, 55%, ${0.4 + random() * 0.4})`;
      const gradientId = `shape-grad-${seed}-${i}`;

      generatedShapes.push({
        type: shapeType,
        x, y, scale, rotation,
        gradientId, shapeColor1, shapeColor2
      });
    }

    return { bgGradientId, bgAngle, color1, color2, generatedShapes };
  }, [address, isValid]);

  if (!isValid) {
    return (
      <div style={{
        width: size,
        height: size,
        background: '#f0f0f0',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ccc',
        fontSize: size * 0.4,
        fontWeight: 'bold',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)'
      }}>
        ?
      </div>
    );
  }

  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 15px 35px rgba(0,0,0,0.2), inset 0 0 30px rgba(255,255,255,0.3)'
    }}>
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id={art.bgGradientId} x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform={`rotate(${art.bgAngle})`}>
            <stop offset="0%" stopColor={art.color1} />
            <stop offset="100%" stopColor={art.color2} />
          </linearGradient>
          {art.generatedShapes.map((shape, i) => (
            <linearGradient key={shape.gradientId} id={shape.gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={shape.shapeColor1} />
              <stop offset="100%" stopColor={shape.shapeColor2} />
            </linearGradient>
          ))}
        </defs>

        <rect width="100" height="100" fill={`url(#${art.bgGradientId})`} />

        {art.generatedShapes.map((shape, i) => {
          const fill = `url(#${shape.gradientId})`;
          const transform = `rotate(${shape.rotation} ${shape.x} ${shape.y})`;

          if (shape.type === 'circle') {
            return <circle key={i} cx={shape.x} cy={shape.y} r={shape.scale / 2} fill={fill} />;
          } else if (shape.type === 'rect') {
            return <rect key={i} x={shape.x - shape.scale / 2} y={shape.y - shape.scale / 2} width={shape.scale} height={shape.scale} rx={shape.scale / 5} fill={fill} transform={transform} />;
          } else if (shape.type === 'triangle') {
            const s = shape.scale;
            const points = `${shape.x},${shape.y - s / 2} ${shape.x - s / 2},${shape.y + s / 2} ${shape.x + s / 2},${shape.y + s / 2}`;
            return <polygon key={i} points={points} fill={fill} transform={transform} />;
          } else if (shape.type === 'ring') {
            return (
              <g key={i} transform={transform}>
                <circle cx={shape.x} cy={shape.y} r={shape.scale / 2} fill="none" stroke={fill} strokeWidth={shape.scale / 5} />
              </g>
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
};

export default AvatarGenerator;
