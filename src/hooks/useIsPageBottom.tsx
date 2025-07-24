import { useEffect, useState } from "react";

export const useIsPageBottom = ({ loadingData }: { loadingData: boolean }) => {
  const [isPageBottom, setIsPageBottom] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 &&
        !loadingData
      ) {
        setIsPageBottom(true);
      } else {
        setIsPageBottom(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingData]);

  return isPageBottom;
};
