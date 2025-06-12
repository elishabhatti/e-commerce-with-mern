import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const RotatingText = ({
  texts = [],
  mainClassName = '',
  staggerFrom = 'last',
  initial = { y: '100%' },
  animate = { y: 0 },
  exit = { y: '-120%' },
  staggerDuration = 0.025,
  splitLevelClassName = '',
  transition = { type: 'spring', damping: 30, stiffness: 400 },
  rotationInterval = 2000
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  const currentText = texts[index].split('');

  return (
    <div className={`flex ${mainClassName}`}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={texts[index]}
          className="flex"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            visible: {
              transition: {
                staggerChildren: staggerDuration,
                staggerDirection: staggerFrom === 'last' ? -1 : 1
              }
            },
            hidden: {}
          }}
        >
          {currentText.map((char, i) => (
            <motion.span
              key={i}
              className={splitLevelClassName}
              initial={initial}
              animate={animate}
              exit={exit}
              transition={transition}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RotatingText;
