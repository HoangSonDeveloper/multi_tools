import React, { useState } from 'react';
import ModeSelector from '../components/BackgroundRemover/ModeSelector';
import UploadZone from '../components/BackgroundRemover/UploadZone';
import ProcessingView from '../components/BackgroundRemover/ProcessingView';
import ResultSection from '../components/BackgroundRemover/ResultSection';

const BackgroundRemover = () => {
    const [step, setStep] = useState('mode'); // 'mode' | 'upload' | 'processing' | 'result'
    const [mode, setMode] = useState(null); // 'vector' | 'photo'
    const [originalImage, setOriginalImage] = useState(null);
    const [originalFile, setOriginalFile] = useState(null);
    const [resultDataUrl, setResultDataUrl] = useState(null);

    const handleModeSelect = (selectedMode) => {
        setMode(selectedMode);
        setStep('upload');
    };

    const handleFileSelected = (file) => {
        const url = URL.createObjectURL(file);
        setOriginalImage(url);
        setOriginalFile(file);
        setStep('processing');
    };

    const handleProcessComplete = (dataUrl) => {
        setResultDataUrl(dataUrl);
        setStep('result');
    };

    const handleReset = () => {
        setOriginalImage(null);
        setOriginalFile(null);
        setResultDataUrl(null);
        setMode(null);
        setStep('mode');
    };

    const handleBack = () => {
        if (step === 'upload') {
            setMode(null);
            setStep('mode');
        } else if (step === 'processing') {
            setStep('upload');
        }
    };

    return (
        <div className="tool-page">
            <section className="hero">
                <h1 className="hero-title">
                    Xóa nền ảnh <span className="gradient-text">thông minh</span>
                </h1>
                <p className="hero-subtitle">
                    {mode === 'vector'
                        ? 'Tự động xóa background màu đồng nhất'
                        : mode === 'photo'
                            ? 'AI tự động detect và xóa background'
                            : 'Chọn loại ảnh để xử lý phù hợp nhất'
                    }
                </p>
            </section>

            {step === 'mode' && (
                <ModeSelector onSelect={handleModeSelect} />
            )}

            {step === 'upload' && (
                <UploadZone onFileSelected={handleFileSelected} onBack={handleBack} />
            )}

            {step === 'processing' && (
                <ProcessingView
                    mode={mode}
                    imageFile={originalFile}
                    imageUrl={originalImage}
                    onComplete={handleProcessComplete}
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
