/**
 * Remove background by color threshold
 * Detects edge colors and removes all similar pixels globally
 * @param {HTMLImageElement} image - Image element
 * @param {number} tolerance - Color tolerance (default: 30)
 * @returns {string} - Data URL of processed image
 */
export function removeBackgroundByColor(image, tolerance = 30) {
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size (limit for performance)
    const maxSize = 2000;
    let width = image.naturalWidth;
    let height = image.naturalHeight;

    if (width > maxSize || height > maxSize) {
        if (width > height) {
            height = (height * maxSize) / width;
            width = maxSize;
        } else {
            width = (width * maxSize) / height;
            height = maxSize;
        }
    }

    canvas.width = width;
    canvas.height = height;

    // Draw image
    ctx.drawImage(image, 0, 0, width, height);

    // Get image data
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Collect unique colors from edges
    const edgeColors = collectEdgeColors(data, width, height);

    // Remove all pixels similar to edge colors
    for (let i = 0; i < data.length; i += 4) {
        const pixelColor = {
            r: data[i],
            g: data[i + 1],
            b: data[i + 2]
        };

        // Check if similar to any edge color
        for (const edgeColor of edgeColors) {
            if (colorSimilar(pixelColor, edgeColor, tolerance)) {
                data[i + 3] = 0; // Make transparent
                break;
            }
        }
    }

    // Put processed data back
    ctx.putImageData(imageData, 0, 0);

    return canvas.toDataURL('image/png');
}

/**
 * Collect unique colors from image edges
 */
function collectEdgeColors(data, width, height) {
    const colors = [];
    const samplePoints = [];

    // Sample from all 4 edges
    for (let x = 0; x < width; x += 5) {
        samplePoints.push({ x, y: 0 });
        samplePoints.push({ x, y: height - 1 });
    }
    for (let y = 0; y < height; y += 5) {
        samplePoints.push({ x: 0, y });
        samplePoints.push({ x: width - 1, y });
    }

    // Collect unique colors
    for (const point of samplePoints) {
        const idx = (point.y * width + point.x) * 4;
        const color = {
            r: data[idx],
            g: data[idx + 1],
            b: data[idx + 2]
        };

        // Check if this color is already in our list
        const exists = colors.some(c => colorSimilar(c, color, 10));
        if (!exists) {
            colors.push(color);
        }
    }

    return colors;
}

/**
 * Check if two colors are similar within tolerance
 */
function colorSimilar(c1, c2, tolerance) {
    return (
        Math.abs(c1.r - c2.r) <= tolerance &&
        Math.abs(c1.g - c2.g) <= tolerance &&
        Math.abs(c1.b - c2.b) <= tolerance
    );
}
