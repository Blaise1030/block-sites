import {useEffect, useState} from "react";

const getWindowDimensions = () => {
  const {innerWidth: width, innerHeight: height} = window;
  return {
    width,
    height,
  };
};

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export const widthResolver = (width: number) => (width <= 1024 ? width : 800);
export const MOBILE_APP_WIDTH = window.innerWidth <= 1024;
export const DESKTOP_APP_WIDTH = window.innerWidth > 1024;
