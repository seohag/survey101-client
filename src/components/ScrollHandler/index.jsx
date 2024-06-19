import { useEffect } from "react";

function ScrollHandler({ containerRef }) {
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const questionAddButton = document.getElementById("questionAddButton");

      if (!container || !questionAddButton) return;

      const offsetTop = container.scrollTop;
      const containerHeight = container.scrollHeight;
      const questionAddButtonHeight = questionAddButton.offsetHeight;

      let newTop;

      if (offsetTop < 0) {
        newTop = 0;
      } else if (offsetTop + questionAddButtonHeight > containerHeight) {
        newTop = containerHeight - questionAddButtonHeight;
      } else {
        newTop = offsetTop;
      }

      setTimeout(() => {
        questionAddButton.style.top = `${newTop}px`;
      }, 70);
    };

    const handleResize = () => {
      handleScroll();
    };

    const container = containerRef.current;

    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef]);

  return null;
}

export default ScrollHandler;
