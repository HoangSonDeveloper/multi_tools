import React, { useCallback } from 'react';

const UploadZone = ({ onFileSelected, onBack }) => {
    const handleClick = () => {
        document.getElementById('file-input').click();
    };

    const handleChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelected(file);
        }
    };

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');

        const file = e.dataTransfer?.files?.[0];
        if (file && file.type.startsWith('image/')) {
            onFileSelected(file);
        }
    }, [onFileSelected]);

    return (
        <div className="upload-section">
            {onBack && (
                <button className="btn btn-secondary btn-back" onClick={onBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Đổi chế độ
                </button>
            )}

            <div
                className="upload-zone"
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="upload-content">
                    <div className="upload-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                    </div>
                    <p className="upload-text">Kéo thả ảnh vào đây</p>
                    <p className="upload-hint">hoặc click để chọn file</p>
                    <p className="upload-formats">Hỗ trợ: JPG, PNG, WebP</p>
                </div>
                <input
                    type="file"
                    id="file-input"
                    accept="image/jpeg,image/png,image/webp"
                    hidden
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default UploadZone;
