import { Colors } from "./types";
	
export const baseColors = {	
  failure: "#ED4B9E",	
  primary: "rgba(0, 0, 0, 1)",	// black
  primaryBright: "rgba(82, 82, 82, 1)",	// brighter black
  primaryDark: "rgba(237, 166, 187, 1)", // darker pink from button hover
  secondary: "#d9e2e9",	// space color, lightish gray
  success: "#31D0AA",	
  warning: "#FFB237",	
};
	
export const brandColors = {	
  binance: "rgba(125, 67, 84, 1)",	
};
	
export const lightColors: Colors = {	
  ...baseColors,	
  ...brandColors,	
  background: "#FAF9FA",	
  backgroundDisabled: "#E9EAEB",	
  contrast: "#191326",	
  invertedContrast: "#FFFFFF",	
  input: "rgb(0,0,0,1)",	
  modalBackground: "rgb(20,20,20,0.8)",	// almost solid black
  tertiary: "#EFF4F5",	
  text: "#1457a8",	
  textDisabled: "#BDC2C4",	
  textSubtle: "#63b6c7",	
  borderColor: "#E9EAEB",	
  card: "#FFFFFF",	
  gradients: {	
    bubblegum: "linear-gradient(139.73deg, #E6FDFF 0%, #F3EFFF 100%)",	
  },	
};

// Active NOW
export const darkColors: Colors = {	
  ...baseColors,	
  ...brandColors,	
  secondary: "rgba(239, 192, 206, 1)", // main pink color
  background: "#343135",	
  backgroundDisabled: "rgba(125, 67, 84, 1)",	
  contrast: "rgba(254, 253, 238, 1)",	
  invertedContrast: "#191326",	// blackish color
  input: "rgba( 237, 216, 236, 0.9);",	// lightish pink for cards (with higher opacity)
  modalBackground: "rgb(255, 255, 255, 0.2)",	// almost solid white
  primaryDark: "rgba(237, 166, 187, 1)",	// darker pink from button hover
  tertiary: "#353547",	
  text: "#000000",	// black
  textDisabled: "rgba(242, 242, 242, 0.5)",	
  textSubtle: "rgba(242, 242, 242, 1)",	// darkish white	
  borderColor: "#524B63",	
  card: "rgba( 237, 216, 236, 0.5);",	// lightish pink for cards
  gradients: {	
    bubblegum: "linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)",	
  },	
};
