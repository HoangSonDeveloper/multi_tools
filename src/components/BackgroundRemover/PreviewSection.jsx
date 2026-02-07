import React, { useRef, useEffect, useState } from 'react';
import { floodFillFromEdges } from '../../utils/floodFill';

const PreviewSection = ({ imageUrl, tolerance, onToleranceChange, onConfirm, onBack }) => {
    const canvasRef = useRef(null);
    const [image, setImage] = useState(null);
    const [originalImageData, setOriginalImageData] = useState(null);

    // Load image when URL changes
    useEffect(() => {
        if (!imageUrl) return;

        const img = new Image();
        img.onload = () => {
            setImage(img);
        };
        img.src = imageUrl;
    }, [imageUrl]);

    // Draw image on canvas and process
    useEffect(() => {
        if (!image || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        // Set canvas size
        const maxWidth = 800;
        const maxHeight = 500;
        let width = image.naturalWidth;
        let height = image.naturalHeight;

        if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
        }
        if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw image
        ctx.drawImage(image, 0, 0, width, height);

        // Store original
        setOriginalImageData(ctx.getImageData(0, 0, width, height));
    }, [image]);

    // Process flood fill when tolerance changes
    useEffect(() => {
        if (!originalImageData || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clone and process
        const processedData = floodFillFromEdges(originalImageData, tolerance);
        ctx.putImageData(processedData, 0, 0);
    }, [originalImageData, tolerance]);

    const handleConfirm = () => {
        if (!canvasRef.current) return;
        const dataUrl = canvasRef.current.toDataURL('image/png');
        onConfirm(dataUrl);
    };

    return (
        <div className="preview-section">
            <div className="preview-header">
                <h2>⚙️ Điều chỉnh độ nhạy</h2>
                <p className="preview-hint">Kéo thanh trượt để thay đổi vùng bị xóa</p>
            </div>

            <div className="preview-container">
                <div className="preview-card">
                    <span className="preview-label">Preview</span>
                    <canvas ref={canvasRef} />
                </div>
            </div>

            <div className="tolerance-control">
                <label>
                    <span>Độ nhạy:</span>
                    <span className="tolerance-value">{tolerance}</span>
                </label>
                <input
                    type="range"
                    min="1"
                    max="100"
                    value={tolerance}
                    onChange={(e) => onToleranceChange(Number(e.target.value))}
                    className="slider"
                />
                <div className="tolerance-hints">
                    <span>Ít hơn</span>
                    <span>Nhiều hơn</span>
                </div>
            </div>

            <div className="preview-actions">
                <button className="btn btn-secondary" onClick={onBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Chọn ảnh khác
                </button>
                <button className="btn btn-primary" onClick={handleConfirm}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Xác nhận
                </button>
            </div>
        </div>
    );
};

export default PreviewSection;
