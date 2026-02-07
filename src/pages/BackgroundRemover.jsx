import React, { useState } from 'react';
import UploadZone from '../components/BackgroundRemover/UploadZone';
import PreviewSection from '../components/BackgroundRemover/PreviewSection';
import ResultSection from '../components/BackgroundRemover/ResultSection';

const BackgroundRemover = () => {
    const [step, setStep] = useState('upload'); // 'upload' | 'preview' | 'result'
    const [originalImage, setOriginalImage] = useState(null);
    const [resultDataUrl, setResultDataUrl] = useState(null);
    const [tolerance, setTolerance] = useState(5);

    const handleFileSelected = (file) => {
        const url = URL.createObjectURL(file);
        setOriginalImage(url);
        setStep('preview');
    };

    const handleConfirm = (dataUrl) => {
        setResultDataUrl(dataUrl);
        setStep('result');
    };

    const handleReset = () => {
        setOriginalImage(null);
        setResultDataUrl(null);
        setTolerance(5);
        setStep('upload');
    };

    const handleBack = () => {
        setStep('upload');
    };

    return (
        <div className="tool-page">
            <section className="hero">
                <h1 className="hero-title">
                    Xóa nền ảnh <span className="gradient-text">thông minh</span>
                </h1>
                <p className="hero-subtitle">
                    Tự động detect background từ viền ảnh. Giữ lại nội dung bên trong.
                </p>
            </section>

            {step === 'upload' && (
                <UploadZone onFileSelected={handleFileSelected} />
            )}

            {step === 'preview' && (
                <PreviewSection
                    imageUrl={originalImage}
                    tolerance={tolerance}
                    onToleranceChange={setTolerance}
                    onConfirm={handleConfirm}
                    onBack={handleBack}
                />
            )}

            {step === 'result' && (
                <ResultSection
                    originalUrl={originalImage}
                    resultUrl={resultDataUrl}
                    onReset={handleReset}
                />
            )}
        </div>
    );
};

export default BackgroundRemover;
