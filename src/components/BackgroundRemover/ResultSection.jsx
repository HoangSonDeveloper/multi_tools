import React from 'react';
import { downloadImage } from '../../utils/download';

const ResultSection = ({ originalUrl, resultUrl, onReset }) => {
    const handleDownload = () => {
        downloadImage(resultUrl, 'removed-background.png');
    };

    return (
        <div className="result-section">
            <div className="result-header">
                <h2>🎉 Kết quả</h2>
                <button className="btn btn-secondary" onClick={onReset}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                        <path d="M21 3v5h-5" />
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                        <path d="M8 16H3v5" />
                    </svg>
                    Ảnh mới
                </button>
            </div>

            <div className="comparison-container">
                <div className="comparison-card">
                    <span className="comparison-label">Ảnh gốc</span>
                    <img src={originalUrl} className="comparison-image" alt="Original" />
                </div>
                <div className="comparison-arrow">→</div>
                <div className="comparison-card result-card">
                    <span className="comparison-label">Đã xóa nền</span>
                    <img src={resultUrl} className="comparison-image checkered-bg" alt="Result" />
                </div>
            </div>

            <div className="download-section">
                <button className="btn btn-primary btn-large" onClick={handleDownload}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Tải ảnh PNG
                </button>
            </div>
        </div>
    );
};

export default ResultSection;
