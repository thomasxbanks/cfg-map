// declare variables
let browser, distance, target, device_type, device_name;

// What are the screen dimensions?
// Defined in browser by default
// screen.width
// screen.height

// What are the browser dimensions?
let getBrowserDimensions = () => {
  return browser = {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  };
};

