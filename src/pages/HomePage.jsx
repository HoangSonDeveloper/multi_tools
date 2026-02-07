import React from 'react';
import { Link } from 'react-router-dom';

// Tool data - add more tools here
const tools = [
    {
        id: 'background-remover',
        name: 'Xóa nền ảnh',
        description: 'Tự động xóa background từ ảnh. Giữ lại nội dung bên trong.',
        icon: '🖼️',
        path: '/background-remover',
        tags: ['Ảnh', 'AI']
    },
    {
        id: 'image-compressor',
        name: 'Nén ảnh',
        description: 'Giảm dung lượng ảnh mà không giảm chất lượng.',
        icon: '📦',
        path: '/image-compressor',
        tags: ['Ảnh'],
        comingSoon: true
    },
    {
        id: 'image-resizer',
        name: 'Resize ảnh',
        description: 'Thay đổi kích thước ảnh theo tỷ lệ hoặc kích thước cụ thể.',
        icon: '📐',
        path: '/image-resizer',
        tags: ['Ảnh'],
        comingSoon: true
    },
    {
        id: 'pdf-merger',
        name: 'Ghép PDF',
        description: 'Gộp nhiều file PDF thành một file duy nhất.',
        icon: '📄',
        path: '/pdf-merger',
        tags: ['PDF'],
        comingSoon: true
    },
    {
        id: 'qr-generator',
        name: 'Tạo QR Code',
        description: 'Tạo mã QR từ link, text, hoặc thông tin liên hệ.',
        icon: '📱',
        path: '/qr-generator',
        tags: ['Tiện ích'],
        comingSoon: true
    },
    {
        id: 'color-picker',
        name: 'Color Picker',
        description: 'Chọn màu từ ảnh và lấy mã HEX, RGB, HSL.',
        icon: '🎨',
        path: '/color-picker',
        tags: ['Design'],
        comingSoon: true
    }
];

const ToolCard = ({ tool }) => {
    if (tool.comingSoon) {
        return (
            <div className="tool-card tool-card--coming-soon">
                <div className="tool-card__icon">{tool.icon}</div>
                <h3 className="tool-card__name">{tool.name}</h3>
                <p className="tool-card__description">{tool.description}</p>
                <div className="tool-card__tags">
                    {tool.tags.map(tag => (
                        <span key={tag} className="tool-card__tag">{tag}</span>
                    ))}
                </div>
                <span className="tool-card__badge">Sắp ra mắt</span>
            </div>
        );
    }

    return (
        <Link to={tool.path} className="tool-card">
            <div className="tool-card__icon">{tool.icon}</div>
            <h3 className="tool-card__name">{tool.name}</h3>
            <p className="tool-card__description">{tool.description}</p>
            <div className="tool-card__tags">
                {tool.tags.map(tag => (
                    <span key={tag} className="tool-card__tag">{tag}</span>
                ))}
            </div>
        </Link>
    );
};

const HomePage = () => {
    return (
        <div className="home-page">
            <section className="hero">
                <h1 className="hero-title">
                    Công cụ online <span className="gradient-text">miễn phí</span>
                </h1>
                <p className="hero-subtitle">
                    Tất cả đều chạy ngay trên trình duyệt. Không cần đăng ký, không upload dữ liệu.
                </p>
            </section>

            <section className="tools-grid">
                {tools.map(tool => (
                    <ToolCard key={tool.id} tool={tool} />
                ))}
            </section>
        </div>
    );
};

export default HomePage;
