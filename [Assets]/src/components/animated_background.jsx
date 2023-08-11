import React from 'react';
import { motion } from 'framer-motion';

const Warship = '/warship.png'; // Adjust the path and extension accordingly

// Generate a random value between min and max
const randomBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Define random offsets for x values
const xOffsets = {
  wave: `${randomBetween(-10, 10)}%`,
  middleWave: `${randomBetween(-10, 10)}%`,
  farWave: `${randomBetween(-10, 10)}%`
};

const rotationOffsets = {
  wave: `${randomBetween(-5, 5)}deg`,
  middleWave: `${randomBetween(-3, 3)}deg`,
  farWave: `${randomBetween(-1, 1)}deg`
};

const waveAnimation = {
  animate: {
    y: ["0%", "5%", "0%"],
    x: ["0%", xOffsets.wave, "0%"],
    rotate: ["0deg", rotationOffsets.wave, "0deg"]
  },
  transition: {
    y: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 6.1,
      ease: "easeInOut",
    },
    x: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: randomBetween(2, 10),
      ease: "easeInOut",
    },
    rotate: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: randomBetween(2, 10),
      ease: "easeInOut",
    }
  }
};

const middleWaveAnimation = {
  animate: {
    y: ["0%", "7.5%", "0%"],
    x: ["0%", xOffsets.middleWave, "0%"],
    rotate: ["0deg", rotationOffsets.middleWave, "0deg"]
  },
  transition: {
    y: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 6.9,
      ease: "easeInOut",
    },
    x: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: randomBetween(2, 10),
      ease: "easeInOut",
    },
    rotate: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: randomBetween(2, 10),
      ease: "easeInOut",
    }
  }
};

const farWaveAnimation = {
  animate: {
    y: ["0%", "10%", "0%"],
    x: ["0%", xOffsets.farWave, "0%"],
    rotate: ["0deg", rotationOffsets.farWave, "0deg"]
  },
  transition: {
    y: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 8.1,
      ease: "easeInOut",
    },
    x: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: randomBetween(2, 10),
      ease: "easeInOut",
    },
    rotate: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: randomBetween(2, 10),
      ease: "easeInOut",
    }
  }
};

const warshipAnimation = {
  animate: {
    y: ["0%", "40%", "0%"],
    x: ["0%", "50%", "0%"]
  },
  transition: {
    y: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 6.1,
      ease: "easeInOut",
    },
    x: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 6.1,
      ease: "easeInOut",
    },
    rotate: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: randomBetween(2, 10),
      ease: "easeInOut",
    }
  },
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
      background: "#CCE7FF",
      overflow: "hidden"
    }}
  >
    {/* Farthest (slowest) wave */}
    <motion.svg
      style={{
        position: "absolute",
        bottom: "0%",
        left: "-10%",  // Start a bit off the screen
        width: "120vw",  // Increase the width to 120%
        height: "50%",
        opacity: 0.6,
      }}
      {...farWaveAnimation}
      viewBox="0 0 2304 150"  // Adjust viewBox width
      preserveAspectRatio="none"
    >
      <path d="M0 10 C 576 70, 1152 60, 2304 50 L 2304 150 L 0 150 Z" fill="#3AA4FF"/>
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
      viewBox="0 0 2304 150" 
      preserveAspectRatio="none"
    >
      <path d="M0 30 C 576 90, 1152 80, 2304 70 L 2304 150 L 0 150 Z" fill="#2F93FF"/>
    </motion.svg>

    {/* Add Warship here */}
    <motion.img 
      src={Warship} 
      alt="Warship" 
      {...warshipAnimation}  // Tying the warship's vertical movement to the wave's movement
      style={{
        position: "absolute",
        bottom: "17%", // Adjust this slightly higher than before to position it above the wave
        left: "45%", // Adjust to position horizontally
        width: "10vw", // Adjust size as needed
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
      viewBox="0 0 2304 150" 
      preserveAspectRatio="none"
    >
      <path d="M0 50 C 576 110, 1152 100, 2304 90 L 2304 150 L 0 150 Z" fill="#0076F6"/>
    </motion.svg>
  </motion.div>
);

export default AnimatedBackground;
