/**
 * Download image from data URL
 * @param {string} dataUrl - Image data URL
 * @param {string} filename - Download filename
 */
export function downloadImage(dataUrl, filename = 'removed-background.png') {
    if (!dataUrl) {
        alert('Không có ảnh để tải.');
        return;
    }

    try {
        // Ensure filename has extension
        if (!filename.includes('.')) {
            filename += '.png';
        }

        console.log('Downloading:', filename, dataUrl);

        // Method: Direct download from data URL
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = filename;
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();

        // Cleanup
        setTimeout(() => {
            a.remove();
            console.log('Download done');
        }, 1000);

    } catch (error) {
        console.error('Download error:', error);
        alert('Lỗi khi tải ảnh: ' + error.message);
    }
}
