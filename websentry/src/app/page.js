"use client"
import { useState } from 'react';
import { Shield, LinkIcon, AlertCircle, AlertTriangle, Lock, Globe, Zap, Loader2 } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkUrl = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('http://127.0.0.1:8000/check-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to check URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getResultColor = () => {
    if (!result) return '';
    return result.prediction === 'legitimate' ? 'text-green-600' : 'text-red-600';
  };

  const highlightHomographChars = (text, detectedChars) => {
    if (!detectedChars) return text;
    
    const chars = detectedChars.split(', ');
    let highlightedText = text;
    
    chars.forEach(char => {
      const parts = highlightedText.split(char);
      highlightedText = parts.join(
        `<span class="underline decoration-2 decoration-red-300 text-red-600 rounded align-baseline relative group inline-block leading-none cursor-pointer">
           ${char}<span class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
           Suspicious character detected
           </span></span>`
      );
    });
    
    return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  const ConfidenceBar = ({ value }) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div 
          className={`h-full ${value >= 50 ? 'bg-green-500' : 'bg-red-500'} transition-all duration-1000 ease-out`}
          style={{ 
            width: `${value}%`,
            animation: 'growWidth 1s ease-out'
          }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 relative overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-4xl mx-auto relative">
        {/* Main Card */}
        <div className="backdrop-blur-lg bg-white/80 shadow-xl mb-8 rounded-2xl p-6">
          <div className="space-y-1 text-center mb-6">
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Web Sentry
              </h1>
            </div>
            <p className="text-gray-600">Advanced URL Security Analysis</p>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LinkIcon className="h-5 w-5 text-blue-400 z-10"/>
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to analyze..."
                className="block w-full pl-10 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 ease-in-out text-gray-900 placeholder-gray-500 bg-white/50 backdrop-blur-sm"
              />
            </div>

            <button
              onClick={checkUrl}
              disabled={isLoading || !url}
              className={`w-full py-4 px-4 rounded-xl font-medium transition duration-150 ease-in-out flex items-center justify-center space-x-2 ${
                isLoading || !url
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
              <span>{isLoading ? 'Analyzing...' : 'Analyze URL'}</span>
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}

            {result && (
              <div className="mt-6 p-6 backdrop-blur-sm bg-white/50 rounded-xl border border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Status:</span>
                    <span className={`font-bold ${getResultColor()}`}>
                      {result.prediction.toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">Confidence:</span>
                      <span className="font-mono text-purple-600 font-medium">
                        {result.prediction === 'legitimate' ?
                        (100-(result.probability * 100).toFixed(2)):
                        (result.probability * 100).toFixed(2)}%
                      </span>
                    </div>
                    <ConfidenceBar 
                      value={result.prediction === 'legitimate' ?
                        (100-(result.probability * 100)):
                        (result.probability * 100)}
                    />
                  </div>
                  {result.prediction === 'phishing' && (
                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl">
                      <AlertCircle className="h-5 w-5" />
                      <span>This URL may be dangerous. Proceed with caution.</span>
                    </div>
                  )}
                   {result.prediction === 'legitimate' && (
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-xl">
                      <AlertCircle className="h-5 w-5" />
                      <span>This URL seems safe. Enjoy safe browsing.</span>
                    </div>
                  )}
                  {result.details.homograph === 'true' && (
                    <div className="space-y-4 mt-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium mb-2 text-black">Homograph Attack Detected in URL:</h3>
                        <div className="bg-white p-3 rounded-lg text-gray-800">
                          {highlightHomographChars(url, result.details.detected_chars)}
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium mb-2 text-black">Punycode URL:</h3>
                        <code className="bg-gray-100 px-2 py-1 rounded break-all text-gray-700">
                          {result.details.punycode_url}
                        </code>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="backdrop-blur-lg bg-white/80 shadow-lg hover:shadow-xl transition-shadow rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Lock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800">Advanced Security</h3>
            </div>
            <p className="text-gray-600">
              Our AI-powered system analyzes URLs for potential security threats and malicious content.
            </p>
          </div>

          <div className="backdrop-blur-lg bg-white/80 shadow-lg hover:shadow-xl transition-shadow rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Globe className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800">Homograph detection</h3>
            </div>
            <p className="text-gray-600">
              Our model identifies homograph attacks that are imperceptible to the human eye
            </p>
          </div>

          <div className="backdrop-blur-lg bg-white/80 shadow-lg hover:shadow-xl transition-shadow rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Zap className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800">Smart Detection</h3>
            </div>
            <p className="text-gray-600">
              Utilizing machine learning to identify and flag potentially harmful websites.
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}