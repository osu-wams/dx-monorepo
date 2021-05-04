import Url from './externalUrls.data';

/**
 * Some Canvas link include the full path including https://instructure...
 * Check to see if that data is included, and if so don't prepend it.
 * If that's not there we add that ourselves. (Most links don't have it)
 */
const canvasUrl = (url: string) => {
  if (!url) {
    return Url.canvas.main;
  }
  // Old canvas url is replaced with the new format
  if (url.startsWith(Url.canvas.mainOld)) {
    const newUrl = url.replace(Url.canvas.mainOld, Url.canvas.main);
    return newUrl;
  }
  // Canvas url is correctly formed or legacy url for dev.dx
  if (url.startsWith(Url.canvas.main) || url.startsWith(Url.canvas.betaOld) || url.startsWith(Url.canvas.testOld)) {
    return url;
  } else {
    return Url.canvas.main + url;
  }
};

export { canvasUrl };
