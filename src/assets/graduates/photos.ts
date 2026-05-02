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
// import groupPhoto from "./group.jpg";
export const GROUP_PHOTO: string | null = null;
// export const GROUP_PHOTO: string | null = groupPhoto;

// ---- Individual graduate photos ----
// import mike from "./mike.jpg";
// import alex from "./alex.jpg";
// import manith from "./manith.jpg";
// import nithpotism from "./nithpotism.jpg";

export const GRAD_PHOTOS: Record<string, string | null> = {
  Mike: null,
  Alex: null,
  Manith: null,
  Nithpotism: null,
  // Mike: mike,
  // Alex: alex,
  // Manith: manith,
  // Nithpotism: nithpotism,
};
