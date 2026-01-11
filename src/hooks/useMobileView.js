import { useState, useEffect } from "react";

export default function useMobileView(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check the viewport width
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}