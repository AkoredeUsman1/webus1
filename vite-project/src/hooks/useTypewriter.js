import { useEffect, useState } from "react";

/**
 * Minimal typewriter that types a phrase, holds, deletes it, then moves on
 * to the next phrase in the list.
 */
export function useTypewriter(phrases, { typeSpeed = 90, deleteSpeed = 45, holdDelay = 1600 } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index];

    if (!deleting && text === current) {
      const hold = setTimeout(() => setDeleting(true), holdDelay);
      return () => clearTimeout(hold);
    }

    const step = deleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(() => {
      if (!deleting) {
        setText((prev) => current.slice(0, prev.length + 1));
        return;
      }

      // Deleting the last character moves straight on to the next phrase.
      if (text.length <= 1) {
        setText("");
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
        return;
      }

      setText((prev) => current.slice(0, prev.length - 1));
    }, step);

    return () => clearTimeout(timer);
  }, [text, deleting, index, phrases, typeSpeed, deleteSpeed, holdDelay]);

  return text;
}
