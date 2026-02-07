import React, { useEffect, useState } from 'react';
import { removeBackground } from '@imgly/background-removal';
import { removeBackgroundByColor } from '../../utils/colorRemoval';

const ProcessingView = ({ mode, imageFile, imageUrl, onComplete, onBack }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Đang xử lý...');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!imageFile && !imageUrl) return;

        const process = async () => {
            try {
                if (mode === 'photo') {
                    // AI-based removal
                    setStatus('Đang tải AI model...');
                    setProgress(10);

                    const result = await removeBackground(imageFile, {
                        progress: (key, current, total) => {
                            const percentage = Math.round((current / total) * 100);

                            if (key.includes('fetch')) {
                                setStatus('Đang tải AI model...');
                                setProgress(10 + percentage * 0.4);
                            } else if (key.includes('compute')) {
                                setStatus('Đang xử lý ảnh...');
                                setProgress(50 + percentage * 0.5);
                            }
                        }
                    });

                    setStatus('Hoàn tất!');
                    setProgress(100);

                    // Convert blob to data URL
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        onComplete(reader.result);
                    };
                    reader.readAsDataURL(result);

                } else {
                    // Vector mode - Color threshold removal
                    setStatus('Đang phân tích màu...');
                    setProgress(30);

                    // Load image
                    const img = new Image();
                    img.onload = async () => {
                        setStatus('Đang xóa background...');
                        setProgress(60);

                        const resultDataUrl = removeBackgroundByColor(img);

                        setStatus('Hoàn tất!');
                        setProgress(100);

                        // Small delay for UX
                        setTimeout(() => {
                            onComplete(resultDataUrl);
                        }, 300);
                    };
                    img.src = imageUrl;
                }

            } catch (err) {
                console.error('Processing error:', err);
                setError(err.message);
            }
        };

        process();
    }, [mode, imageFile, imageUrl, onComplete]);

    if (error) {
        return (
            <div className="processing-section">
                <div className="processing-card error">
                    <div className="processing-icon">❌</div>
                    <h3>Đã xảy ra lỗi</h3>
                    <p>{error}</p>
                    <button className="btn btn-secondary" onClick={onBack}>
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="processing-section">
            <div className="processing-card">
                <div className="processing-preview">
                    <img src={imageUrl} alt="Processing" />
                    <div className="processing-overlay">
                        <div className="processing-spinner"></div>
                    </div>
                </div>

                <div className="processing-info">
                    <div className="processing-status">{status}</div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="progress-text">{progress}%</div>
                </div>

                <button className="btn btn-secondary" onClick={onBack}>
                    Hủy
                </button>
            </div>
        </div>
    );
};

export default ProcessingView;
