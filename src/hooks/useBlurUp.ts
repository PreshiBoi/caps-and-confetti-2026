import { useEffect, useState } from "react";

/**
 * Hook for Low Quality Image Placeholder (LQIP) effect
 * Generates a tiny blurred version of an image to use as a loading placeholder
 */
export const useBlurUp = (imageSrc: string | undefined) => {
    const [blurDataUrl, setBlurDataUrl] = useState<string>("");

    useEffect(() => {
        if (!imageSrc) {
            setBlurDataUrl("");
            return;
        }

        const generateBlurPlaceholder = async () => {
            try {
                // Create a tiny version of the image (10x10px) as a placeholder
                const img = new Image();
                img.crossOrigin = "anonymous";

                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = 10;
                    canvas.height = 10;
                    const ctx = canvas.getContext("2d");
                    if (ctx) {
                        ctx.drawImage(img, 0, 0, 10, 10);
                        setBlurDataUrl(canvas.toDataURL("image/jpeg", 0.5));
                    }
                };

                img.onerror = () => {
                    console.warn(`Failed to load image for blur placeholder: ${imageSrc}`);
                    setBlurDataUrl("");
                };

                img.src = imageSrc;
            } catch (error) {
                console.warn("Error generating blur placeholder:", error);
                setBlurDataUrl("");
            }
        };

        generateBlurPlaceholder();
    }, [imageSrc]);

    return blurDataUrl;
};
