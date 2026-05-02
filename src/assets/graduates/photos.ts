// =====================================================
//  PHOTO IMPORTS — easy place to wire in your images.
// =====================================================
//
//  HOW TO USE:
//  1. Drop image files into `src/assets/graduates/`
//     (e.g. group.jpg, mike.jpg, alex.jpg, ...)
//  2. Uncomment the matching import lines below.
//  3. Set the value in GROUP_PHOTO / GRAD_PHOTOS.
//
//  Anything left as `null` will show the placeholder icon.
// =====================================================

// ---- Group photo ----
import groupPhoto from "./GROUP_PHOTO.jpg";
export const GROUP_PHOTO: string | null = groupPhoto;

// ---- Individual graduate photos ----
import mike from "./Tey Tey.jpeg";
import alex from "./Mak Oun Orn Jit.jpg";
import manith from "./Nithpotiser.jpeg";
import nithpotism from "./Manon.jpg";

export const GRAD_PHOTOS: Record<string, string | null> = {
  "Tey Tey": mike,
  "Mak Oun Orn Jit": alex,
  "Nithpotiser": manith,
  "Manon": nithpotism,
};
