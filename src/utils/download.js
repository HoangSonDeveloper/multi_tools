/**
 * Convert base64/dataURL to Blob
 * @param {string} input - Base64 string or data URL
 * @returns {Blob}
 */
function dataUrlToBlob(input) {
    let mime = 'image/png';
    let b64 = input;

    // If it's a dataURL: data:image/png;base64,....
    if (typeof input === 'string' && input.startsWith('data:')) {
        const [meta, data] = input.split(',');
        mime = meta.match(/data:(.*?);base64/)?.[1] || mime;
        b64 = data;
    }

    // Basic sanitize
    b64 = (b64 || '').trim().replace(/\s/g, '');
    if (!b64) throw new Error('Empty base64');

    // Decode base64 -> bytes
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return new Blob([bytes], { type: mime });
}

/**
 * Download image from data URL
 * @param {string} dataUrl - Image data URL
 * @param {string} filename - Download filename
 */
export function downloadImage(dataUrl, filename = 'image.png') {
    if (!dataUrl) {
        alert('Không có ảnh để tải.');
        return;
    }

    try {
        const blob = typeof dataUrl === 'string'
            ? dataUrlToBlob(dataUrl)
            : dataUrl;

        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = blob.type === 'image/jpeg' ? filename.replace('.png', '.jpg') : filename;

        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            URL.revokeObjectURL(url);
            a.remove();
        }, 5000);
    } catch (error) {
        console.error('Download error:', error);
        alert('Lỗi khi tải ảnh: ' + error.message);
    }
}
