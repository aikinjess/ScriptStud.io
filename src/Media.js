import { createMedia } from "@artsy/fresnel";

const AppMedia = createMedia({
    breakpoints: {
      mobile: 320,
      tablet: 768,
      computer: 992,
      largeScreen: 1200,
      widescreen: 1920
    }
  });
  
  export const mediaStyles = AppMedia.createMediaStyle();
  export const { Media, MediaContextProvider } = AppMedia;