import { useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/check-url/', { url });
            setResult(response.data);
        } catch (error) {
            console.error("Error checking URL:", error);
            setResult({ error: "Error checking URL" });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4 text-black">URL Phishing Checker</h1>
            <form onSubmit={handleSubmit} className="flex flex-col mb-4">
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL"
                    className="p-2 border border-gray-300 rounded-md mb-2"
                    required
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
                    Check URL
                </button>
            </form>
            {result && (
                <div className="bg-white p-4 rounded-md shadow-md">
                    <h2 className="font-bold">Result:</h2>
                    {result.error ? (
                        <p className="text-red-500">{result.error}</p>
                    ) : (
                        <p>
                            Prediction: {result.prediction} <br />
                            Probability: {(result.probability * 100).toFixed(2)}%
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
