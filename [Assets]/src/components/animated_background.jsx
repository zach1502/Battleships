import React from 'react';
import { motion } from 'framer-motion';

// Constants
const WARSHIP_IMAGE_PATH = '/warship.png';
const BACKGROUND_COLOR = "#CCE7FF";
const WAVE_COLORS = {
  farWave: "#3AA4FF",
  middleWave: "#2F93FF",
  foremostWave: "#0076F6",
};
const PATH_VALUES = {
  farWave: "M0 10 C 576 70, 1152 60, 2304 50 L 2304 150 L 0 150 Z",
  middleWave: "M0 30 C 576 90, 1152 80, 2304 70 L 2304 150 L 0 150 Z",
  foremostWave: "M0 50 C 576 110, 1152 100, 2304 90 L 2304 150 L 0 150 Z",
};
const WAVE_OPACITY = {
  farWave: 0.6
};
const SVG_VIEWBOX = "0 0 2304 150";
const REPEAT_ANIMATION = {
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut"
};

// Generate a random value between min and max
const randomBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Define random offsets for x values
const xOffsets = {
  wave: `${randomBetween(-7, 7)}%`,
  middleWave: `${randomBetween(-7, 7)}%`,
  farWave: `${randomBetween(-7, 7)}%`
};

const rotationOffsets = {
  wave: `${randomBetween(-2, 2)}deg`,
  middleWave: `${randomBetween(-2, 2)}deg`,
  farWave: `${randomBetween(-1, 1)}deg`
};

const waveAnimation = {
  animate: {
    y: ["0%", "5%", "0%"],
    x: ["0%", xOffsets.wave, "0%"],
    rotate: ["0deg", rotationOffsets.wave, "0deg"]
  },
  transition: {
    y: { ...REPEAT_ANIMATION, duration: 6.1 },
    x: { ...REPEAT_ANIMATION, duration: randomBetween(4, 10) },
    rotate: { ...REPEAT_ANIMATION, duration: randomBetween(4, 10) }
  }
};

const middleWaveAnimation = {
  animate: {
    y: ["0%", "7.5%", "0%"],
    x: ["0%", xOffsets.middleWave, "0%"],
    rotate: ["0deg", rotationOffsets.middleWave, "0deg"]
  },
  transition: {
    y: { ...REPEAT_ANIMATION, duration: 6.9 },
    x: { ...REPEAT_ANIMATION, duration: randomBetween(4, 10) },
    rotate: { ...REPEAT_ANIMATION, duration: randomBetween(4, 10) }
  }
};

const farWaveAnimation = {
  animate: {
    y: ["0%", "10%", "0%"],
    x: ["0%", xOffsets.farWave, "0%"],
    rotate: ["0deg", rotationOffsets.farWave, "0deg"]
  },
  transition: {
    y: { ...REPEAT_ANIMATION, duration: 8.3 },
    x: { ...REPEAT_ANIMATION, duration: randomBetween(4, 10) },
    rotate: { ...REPEAT_ANIMATION, duration: randomBetween(4, 10) }
  }
};

const warshipAnimation = {
  animate: {
    y: ["0%", "40%", "0%"],
    x: ["0%", "50%", "0%"]
  },
  transition: {
    y: { ...REPEAT_ANIMATION, duration: 6.1 },
    x: { ...REPEAT_ANIMATION, duration: 6.1 },
    rotate: { ...REPEAT_ANIMATION, duration: randomBetween(4, 10) }
  }
};

const AnimatedBackground = () => (
  <motion.div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100%",
      zIndex: -1,
      background: BACKGROUND_COLOR,
      overflow: "hidden"
    }}
  >
    {/* Farthest (slowest) wave */}
    <motion.svg
      style={{
        position: "absolute",
        bottom: "0%",
        left: "-10%",
        width: "120vw",
        height: "50%",
        opacity: WAVE_OPACITY.farWave
      }}
      {...farWaveAnimation}
      viewBox={SVG_VIEWBOX}
      preserveAspectRatio="none"
    >
      <path d={PATH_VALUES.farWave} fill={WAVE_COLORS.farWave} />
    </motion.svg>

    {/* Middle wave */}
    <motion.svg
      style={{
        position: "absolute",
        bottom: "0%",
        left: "-10%",
        width: "120vw",
        height: "52%",
      }}
      {...middleWaveAnimation}
      viewBox={SVG_VIEWBOX}
      preserveAspectRatio="none"
    >
      <path d={PATH_VALUES.middleWave} fill={WAVE_COLORS.middleWave} />
    </motion.svg>

    {/* Add Warship here */}
    <motion.img
      src={WARSHIP_IMAGE_PATH}
      alt="Warship"
      {...warshipAnimation}
      style={{
        position: "absolute",
        bottom: "17%",
        left: "45%",
        width: "10vw",
        zIndex: 1
      }}
    />

    {/* Foremost wave */}
    <motion.svg
      style={{
        position: "absolute",
        bottom: "0%",
        left: "-10%",
        width: "120vw",
        height: "55%",
      }}
      {...waveAnimation}
      viewBox={SVG_VIEWBOX}
      preserveAspectRatio="none"
    >
      <path d={PATH_VALUES.foremostWave} fill={WAVE_COLORS.foremostWave} />
    </motion.svg>
  </motion.div>
);

export default AnimatedBackground;
