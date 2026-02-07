/**
 * Flood fill from edges of image
 * @param {ImageData} originalImageData - Original image data
 * @param {number} tolerance - Color tolerance (1-100)
 * @param {boolean} globalRemove - Whether to remove similar colors globally
 * @returns {ImageData} - Processed image data with transparent background
 */
export function floodFillFromEdges(originalImageData, tolerance, globalRemove = false) {
    const width = originalImageData.width;
    const height = originalImageData.height;

    // Clone image data
    const imageData = new ImageData(
        new Uint8ClampedArray(originalImageData.data),
        width,
        height
    );
    const data = imageData.data;

    // Collect edge colors for reference
    const edgeColors = [];

    // Get colors from edges
    for (let x = 0; x < width; x++) {
        edgeColors.push(getColorAt(data, x, 0, width));
        edgeColors.push(getColorAt(data, x, height - 1, width));
    }
    for (let y = 0; y < height; y++) {
        edgeColors.push(getColorAt(data, 0, y, width));
        edgeColors.push(getColorAt(data, width - 1, y, width));
    }

    if (globalRemove) {
        // Global removal - remove all pixels similar to any edge color
        globalColorRemoval(data, width, height, edgeColors, tolerance);
    } else {
        // Standard flood fill from edges
        standardFloodFill(data, width, height, tolerance);
    }

    return imageData;
}

/**
 * Flood fill from a specific point (for click-to-remove)
 * @param {ImageData} currentImageData - Current processed image data
 * @param {number} x - Click X coordinate
 * @param {number} y - Click Y coordinate
 * @param {number} tolerance - Color tolerance
 * @returns {ImageData} - Updated image data
 */
export function floodFillFromPoint(currentImageData, x, y, tolerance) {
    const width = currentImageData.width;
    const height = currentImageData.height;

    // Clone image data
    const imageData = new ImageData(
        new Uint8ClampedArray(currentImageData.data),
        width,
        height
    );
    const data = imageData.data;

    // Get color at click point
    const startColor = getColorAt(data, Math.floor(x), Math.floor(y), width);

    // If pixel is already transparent, skip
    if (startColor.a === 0) {
        return imageData;
    }

    // Track visited pixels
    const visited = new Uint8Array(width * height);

    // Queue for BFS
    const queue = [{ x: Math.floor(x), y: Math.floor(y) }];

    // Process queue (BFS)
    while (queue.length > 0) {
        const { x: cx, y: cy } = queue.shift();

        // Bounds check
        if (cx < 0 || cx >= width || cy < 0 || cy >= height) continue;

        // Already visited?
        const idx = cy * width + cx;
        if (visited[idx]) continue;
        visited[idx] = 1;

        // Get current pixel color
        const currentColor = getColorAt(data, cx, cy, width);

        // Skip if already transparent
        if (currentColor.a === 0) continue;

        // Check if similar to start color
        if (!colorSimilar(startColor, currentColor, tolerance)) continue;

        // Make this pixel transparent
        const pixelIdx = idx * 4;
        data[pixelIdx + 3] = 0;

        // Add neighbors
        queue.push({ x: cx - 1, y: cy });
        queue.push({ x: cx + 1, y: cy });
        queue.push({ x: cx, y: cy - 1 });
        queue.push({ x: cx, y: cy + 1 });
    }

    return imageData;
}

// Helper: Get color at position
function getColorAt(data, x, y, width) {
    const idx = (y * width + x) * 4;
    return {
        r: data[idx],
        g: data[idx + 1],
        b: data[idx + 2],
        a: data[idx + 3]
    };
}

// Helper: Check if two colors are similar
function colorSimilar(c1, c2, tol) {
    const dr = Math.abs(c1.r - c2.r);
    const dg = Math.abs(c1.g - c2.g);
    const db = Math.abs(c1.b - c2.b);
    return dr <= tol && dg <= tol && db <= tol;
}

// Standard flood fill from edges
function standardFloodFill(data, width, height, tolerance) {
    const visited = new Uint8Array(width * height);
    const queue = [];

    // Add all edge pixels to queue
    for (let x = 0; x < width; x++) {
        queue.push({ x, y: 0 });
        queue.push({ x, y: height - 1 });
    }
    for (let y = 0; y < height; y++) {
        queue.push({ x: 0, y });
        queue.push({ x: width - 1, y });
    }

    // Process queue (BFS)
    while (queue.length > 0) {
        const { x, y } = queue.shift();

        if (x < 0 || x >= width || y < 0 || y >= height) continue;

        const idx = y * width + x;
        if (visited[idx]) continue;
        visited[idx] = 1;

        const currentColor = getColorAt(data, x, y, width);

        // Check neighbors
        const neighbors = [
            { x: x - 1, y },
            { x: x + 1, y },
            { x, y: y - 1 },
            { x, y: y + 1 }
        ];

        for (const neighbor of neighbors) {
            if (neighbor.x < 0 || neighbor.x >= width ||
                neighbor.y < 0 || neighbor.y >= height) continue;

            const nIdx = neighbor.y * width + neighbor.x;
            if (visited[nIdx]) continue;

            const neighborColor = getColorAt(data, neighbor.x, neighbor.y, width);

            if (colorSimilar(currentColor, neighborColor, tolerance)) {
                queue.push(neighbor);
            }
        }

        // Make this pixel transparent
        const pixelIdx = idx * 4;
        data[pixelIdx + 3] = 0;
    }
}

// Global color removal - remove all similar colors
function globalColorRemoval(data, width, height, edgeColors, tolerance) {
    // Find unique edge colors (sample to avoid too many)
    const uniqueColors = [];
    for (let i = 0; i < edgeColors.length; i += 10) {
        const color = edgeColors[i];
        const exists = uniqueColors.some(c => colorSimilar(c, color, 5));
        if (!exists) {
            uniqueColors.push(color);
        }
    }

    // Remove all pixels similar to any edge color
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            const pixelColor = {
                r: data[idx],
                g: data[idx + 1],
                b: data[idx + 2]
            };

            // Check if similar to any edge color
            for (const edgeColor of uniqueColors) {
                if (colorSimilar(pixelColor, edgeColor, tolerance)) {
                    data[idx + 3] = 0; // Make transparent
                    break;
                }
            }
        }
    }
}
