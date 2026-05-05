// =====================================================
//  PHOTO IMPORTS — dynamic loading for performance
// =====================================================
//
//  HOW TO USE:
//  1. Drop image files into `src/assets/graduates/`
//     (e.g. group.jpg, mike.jpg, alex.jpg, ...)
//  2. Images are now dynamically imported for better performance.
//  3. Set the paths in GROUP_PHOTO_PATH / GRAD_PHOTOS_PATHS.
//
//  Images use lazy loading — they'll only be loaded when visible on screen!
// =====================================================

// ---- Group photo (dynamic import) ----
export const GROUP_PHOTO_PATH = "./GROUP_PHOTO.jpg";

// ---- Individual graduate photos (dynamic imports) ----
export const GRAD_PHOTOS_PATHS: Record<string, string> = {
  "Vatey": "./TeyTey.jpeg",
  "Zneath": "./MakOunOrnJit.jpg",
  "Manith": "./Nithpotiser.jpeg",
  "Piseth": "./Manon.jpg",
};

// Legacy exports for backwards compatibility
import groupPhoto from "./GROUP_PHOTO.jpg";
export const GROUP_PHOTO: string | null = groupPhoto;

import mike from "./TeyTey.jpeg";
import alex from "./MakOunOrnJit.jpg";
import manith from "./Nithpotiser.jpeg";
import nithpotism from "./Manon.jpg";

export const GRAD_PHOTOS: Record<string, string | null> = {
  "Vatey": mike,
  "Zneath": alex,
  "Manith": manith,
  "Piseth": nithpotism,
};
