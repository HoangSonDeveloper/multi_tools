import React, { useState } from 'react';
import Header from './components/Header';
import UploadZone from './components/UploadZone';
import PreviewSection from './components/PreviewSection';
import ResultSection from './components/ResultSection';
import Footer from './components/Footer';

const App = () => {
    const [step, setStep] = useState('upload'); // 'upload' | 'preview' | 'result'
    const [originalImage, setOriginalImage] = useState(null);
    const [originalFile, setOriginalFile] = useState(null);
    const [resultDataUrl, setResultDataUrl] = useState(null);
    const [tolerance, setTolerance] = useState(5);

    const handleFileSelected = (file) => {
        const url = URL.createObjectURL(file);
        setOriginalFile(file);
        setOriginalImage(url);
        setStep('preview');
    };

    const handleConfirm = (dataUrl) => {
        setResultDataUrl(dataUrl);
        setStep('result');
    };

    const handleReset = () => {
        setOriginalImage(null);
        setOriginalFile(null);
        setResultDataUrl(null);
        setTolerance(5);
        setStep('upload');
    };

    const handleBack = () => {
        setStep('upload');
    };

    return (
        <div className="app">
            <Header />

            <main className="main">
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
            </main>

            <Footer />
        </div>
    );
};

export default App;
