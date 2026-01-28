'use client';

import { useState } from 'react';
import { Sparkles, Video, Image as ImageIcon, Loader2, Download, AlertCircle } from 'lucide-react';

type Tab = 'image' | 'video';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('image');
  const [hfToken, setHfToken] = useState('');

  // Estados para Geração de Imagem
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  // Estados para Geração de Vídeo
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Função para gerar imagem
  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) {
      setImageError('Por favor, insira um prompt');
      return;
    }

    if (!hfToken.trim()) {
      setImageError('Por favor, insira seu Hugging Face Token');
      return;
    }

    setImageLoading(true);
    setImageError(null);
    setGeneratedImage(null);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: imagePrompt,
          token: hfToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao gerar imagem');
      }

      setGeneratedImage(data.imageUrl);
    } catch (error: any) {
      setImageError(error.message || 'Erro ao gerar imagem');
      console.error('Erro:', error);
    } finally {
      setImageLoading(false);
    }
  };

  // Função para gerar vídeo
  const handleGenerateVideo = async () => {
    if (!selectedImage || !selectedAudio) {
      setVideoError('Por favor, selecione uma imagem e um áudio');
      return;
    }

    if (!hfToken.trim()) {
      setVideoError('Por favor, insira seu Hugging Face Token');
      return;
    }

    setVideoLoading(true);
    setVideoError(null);
    setGeneratedVideo(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('audio', selectedAudio);
      formData.append('token', hfToken);

      const response = await fetch('/api/generate-video', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao gerar vídeo');
      }

      setGeneratedVideo(data.videoUrl);
    } catch (error: any) {
      setVideoError(error.message || 'Erro ao gerar vídeo');
      console.error('Erro:', error);
    } finally {
      setVideoLoading(false);
    }
  };

  // Handler para preview de imagem
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TUMALU AI
              </h1>
            </div>
            <div className="text-sm text-gray-400">
              Powered by FLUX & LivePortrait
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Token Input */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hugging Face Access Token
            </label>
            <input
              type="password"
              value={hfToken}
              onChange={(e) => setHfToken(e.target.value)}
              placeholder="hf_..."
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="mt-2 text-xs text-gray-400">
              Obtenha seu token gratuito em:{' '}
              <a
                href="https://huggingface.co/settings/tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                huggingface.co/settings/tokens
              </a>
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('image')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'image'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            <span>Gerar Imagem</span>
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'video'
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/50'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Video className="w-5 h-5" />
            <span>Gerar Vídeo (Lip Sync)</span>
          </button>
        </div>

        {/* Image Generation Tab */}
        {activeTab === 'image' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Gerador de Imagens FLUX.1-schnell
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Prompt
                  </label>
                  <textarea
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="Ex: Influencer holding a smartphone, professional studio lighting, high quality"
                    rows={4}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>

                <button
                  onClick={handleGenerateImage}
                  disabled={imageLoading || !hfToken}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
                >
                  {imageLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Gerando imagem...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Gerar Imagem</span>
                    </>
                  )}
                </button>

                {imageError && (
                  <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="text-red-300 text-sm">{imageError}</div>
                  </div>
                )}

                {generatedImage && (
                  <div className="space-y-4">
                    <div className="relative rounded-lg overflow-hidden bg-gray-900">
                      <img
                        src={generatedImage}
                        alt="Generated"
                        className="w-full h-auto"
                      />
                    </div>
                    <a
                      href={generatedImage}
                      download="tumalu-image.png"
                      className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Imagem</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Video Generation Tab */}
        {activeTab === 'video' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Gerador de Vídeo LivePortrait (Lip Sync)
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Imagem do Rosto
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer bg-gray-900 border border-gray-600 rounded-lg"
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-xs rounded-lg border border-gray-600"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Arquivo de Áudio
                  </label>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setSelectedAudio(e.target.files?.[0] || null)}
                    className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-600 file:text-white hover:file:bg-pink-700 cursor-pointer bg-gray-900 border border-gray-600 rounded-lg"
                  />
                  {selectedAudio && (
                    <p className="mt-2 text-sm text-gray-400">
                      Arquivo selecionado: {selectedAudio.name}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleGenerateVideo}
                  disabled={videoLoading || !hfToken || !selectedImage || !selectedAudio}
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
                >
                  {videoLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Gerando vídeo... (pode levar alguns minutos)</span>
                    </>
                  ) : (
                    <>
                      <Video className="w-5 h-5" />
                      <span>Gerar Vídeo</span>
                    </>
                  )}
                </button>

                {videoError && (
                  <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="text-red-300 text-sm">{videoError}</div>
                  </div>
                )}

                {generatedVideo && (
                  <div className="space-y-4">
                    <div className="relative rounded-lg overflow-hidden bg-gray-900">
                      <video
                        src={generatedVideo}
                        controls
                        className="w-full h-auto"
                      />
                    </div>
                    <a
                      href={generatedVideo}
                      download="tumalu-video.mp4"
                      className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Vídeo</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            TUMALU AI © 2025 - Geração de conteúdo com IA usando APIs gratuitas
          </p>
        </div>
      </footer>
    </div>
  );
}
