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
        // Pause before typing next word (after deleting to LCP)
        const randomPause = delay * (0.5 + Math.random() * 10);
        timer = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex(nextIndex);
        }, randomPause);
      } else {
        // Delete speed per character: slightly random (e.g. 80% to 120%)
        const randomDeleteDelay = deleteDelay * (0.8 + Math.random() * 0.4);
        timer = setTimeout(() => {
          setText(currentWord.substring(0, text.length - 1));
        }, randomDeleteDelay);
      }
    } else {
      if (text === currentWord) {
        // Break after typing a word: 10% to 200% of waitDelay
        const randomWait = waitDelay * (0.1 + Math.random() * 1.9);
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, randomWait);
      } else {
        // Typing speed per character: random (e.g. 40% to 160%)
        const randomDelay = delay * (0.4 + Math.random() * 1.2);
        timer = setTimeout(() => {
          setText(currentWord.substring(0, text.length + 1));
        }, randomDelay);
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
