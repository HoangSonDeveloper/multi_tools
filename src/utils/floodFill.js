/**
 * Flood fill from edges of image
 * @param {ImageData} originalImageData - Original image data
 * @param {number} tolerance - Color tolerance (1-100)
 * @returns {ImageData} - Processed image data with transparent background
 */
export function floodFillFromEdges(originalImageData, tolerance) {
    const width = originalImageData.width;
    const height = originalImageData.height;

    // Clone image data
    const imageData = new ImageData(
        new Uint8ClampedArray(originalImageData.data),
        width,
        height
    );
    const data = imageData.data;

    // Track visited pixels
    const visited = new Uint8Array(width * height);

    // Queue for BFS
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

    // Get color at position
    const getColor = (x, y) => {
        const idx = (y * width + x) * 4;
        return {
            r: data[idx],
            g: data[idx + 1],
            b: data[idx + 2]
        };
    };

    // Check if two colors are similar
    const colorSimilar = (c1, c2, tol) => {
        const dr = Math.abs(c1.r - c2.r);
        const dg = Math.abs(c1.g - c2.g);
        const db = Math.abs(c1.b - c2.b);
        return dr <= tol && dg <= tol && db <= tol;
    };

    // Process queue (BFS)
    while (queue.length > 0) {
        const { x, y } = queue.shift();

        // Bounds check
        if (x < 0 || x >= width || y < 0 || y >= height) continue;

        // Already visited?
        const idx = y * width + x;
        if (visited[idx]) continue;
        visited[idx] = 1;

        // Get current pixel color
        const currentColor = getColor(x, y);

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

            const neighborColor = getColor(neighbor.x, neighbor.y);

            if (colorSimilar(currentColor, neighborColor, tolerance)) {
                queue.push(neighbor);
            }
        }

        // Make this pixel transparent
        const pixelIdx = idx * 4;
        data[pixelIdx + 3] = 0;
    }

    return imageData;
}
