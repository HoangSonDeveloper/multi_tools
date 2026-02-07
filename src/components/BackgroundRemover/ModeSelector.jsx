import React from 'react';

const ModeSelector = ({ onSelect }) => {
    return (
        <div className="mode-selector">
            <div className="mode-cards">
                <button
                    className="mode-card"
                    onClick={() => onSelect('vector')}
                >
                    <div className="mode-card__icon">🎨</div>
                    <h3 className="mode-card__title">Ảnh Vector</h3>
                    <p className="mode-card__description">
                        Logo, sticker, illustration, artwork với background màu đồng nhất
                    </p>
                    <div className="mode-card__features">
                        <span>⚡ Xử lý ngay lập tức</span>
                        <span>🎚️ Điều chỉnh độ nhạy</span>
                    </div>
                    <span className="mode-card__badge">Flood Fill</span>
                </button>

                <button
                    className="mode-card"
                    onClick={() => onSelect('photo')}
                >
                    <div className="mode-card__icon">📸</div>
                    <h3 className="mode-card__title">Ảnh Chụp</h3>
                    <p className="mode-card__description">
                        Ảnh người, sản phẩm, động vật với background phức tạp
                    </p>
                    <div className="mode-card__features">
                        <span>🤖 AI tự động detect</span>
                        <span>✨ Xử lý viền mượt</span>
                    </div>
                    <span className="mode-card__badge">AI Model</span>
                </button>
            </div>
        </div>
    );
};

export default ModeSelector;
