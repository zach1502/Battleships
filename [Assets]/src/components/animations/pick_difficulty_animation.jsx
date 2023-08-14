import { motion } from 'framer-motion';

const levels = {
  easy: { position: '90%', peakPosition: '90%' },
  medium: { position: '65%', peakPosition: '70%' },
  hard: { position: '30%', peakPosition: '55%' },
  impossible: { position: '0%', peakPosition: '40%' },
  default: { position: '90%', peakPosition: '90%' },
};

const OCEAN_GATE_PATH = '/normalSubmarine.webp';

const SeaWaterLevel = ({ difficulty }) => {
  const { position } = levels[difficulty] || levels.default;

  return (
    <>
      <motion.svg
        width="100vw"
        height="100vh"
        animate={{
          top: position,
        }}
        transition={{
          duration: 2.5,
          ease: "easeInOut"
        }}
        style={{
          position: "absolute",
          top: position,
          left: 0,
          zIndex: -1,
        }}
      >
        <motion.linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <motion.stop offset="0%" style={{ stopColor: "#0076F6" }} />
          <motion.stop offset="100%" style={{ stopColor: "black" }} />
        </motion.linearGradient>
        <motion.rect
          width="100vw"
          height="100vh"
          fill="url(#gradient)"
        />
      </motion.svg>
        <motion.div
          initial={{ y: `100px` }}
          animate={{ y: `calc(-100px + 8*${position})` }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 0,
          }}
        >
          <motion.img
            src={OCEAN_GATE_PATH}
            alt="submarine"
            style={{
              width: '200px',
              height: '100px',
            }}
          />
        </motion.div>
    </>
  );
};

export default SeaWaterLevel;
