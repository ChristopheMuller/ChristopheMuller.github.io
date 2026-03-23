import React, { useState, useEffect, useRef } from 'react';

const Typewriter = ({ words, delay = 150, deleteDelay = 75, waitDelay = 2000 }) => {
  const [text, setText] = useState(words[0] || '');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Keep words reference stable
  const wordsRef = useRef(words);
  wordsRef.current = words;

  useEffect(() => {
    const currentWords = wordsRef.current;
    if (!currentWords || currentWords.length === 0) return;

    let timer;
    const currentWord = currentWords[wordIndex];
    const nextIndex = (wordIndex + 1) % currentWords.length;
    const nextWord = currentWords[nextIndex];

    // Find Longest Common Prefix (LCP)
    const getLCP = (w1, w2) => {
      let i = 0;
      while (i < w1.length && i < w2.length && w1[i] === w2[i]) {
        i++;
      }
      return w1.substring(0, i);
    };

    const lcp = getLCP(currentWord, nextWord);

    if (isDeleting) {
      if (text === lcp) {
        const randomPause = delay * (1 + Math.random() * 5);
        timer = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex(nextIndex);
        }, randomPause);
      } else {
        timer = setTimeout(() => {
          setText(currentWord.substring(0, text.length - 1));
        }, deleteDelay);
      }
    } else {
      if (text === currentWord) {
        const randomWait = waitDelay * (0.75 + Math.random() * 0.5);
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, randomWait);
      } else {
        timer = setTimeout(() => {
          setText(currentWord.substring(0, text.length + 1));
        }, delay);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, delay, deleteDelay, waitDelay]);

  return (
    <span className="typewriter">
      {text}
      <span className="typewriter-cursor">|</span>
    </span>
  );
};

export default Typewriter;
