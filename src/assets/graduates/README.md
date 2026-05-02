# Graduate & Group Photos

## How to add photos

1. Drop your image files into this folder (`src/assets/graduates/`).
   - Recommended formats: `.jpg`, `.png`, or `.webp`
   - Square photos work best for individual portraits (e.g. 800×800).
   - Group photo: 16:10 ratio (e.g. 1600×1000).

2. Then open **`src/assets/graduates/photos.ts`** and update the imports:

```ts
// Group photo
import groupPhoto from "./group.jpg";

// Individual graduate photos — keep names matching `Graduates.tsx`
import mike from "./mike.jpg";
import alex from "./alex.jpg";
import manith from "./manith.jpg";
import nithpotism from "./nithpotism.jpg";

export const GROUP_PHOTO = groupPhoto;
export const GRAD_PHOTOS: Record<string, string> = {
  Mike: mike,
  Alex: alex,
  Manith: manith,
  Nithpotism: nithpotism,
};
```

That's it — the website will automatically display your photos.

If a photo is missing, the placeholder icon will show instead.
