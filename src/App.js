import React, { useState } from 'react';
import analyzeImages from './azure-image-analysis';
import './App.css';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState('');
  const features = "caption";
  const language = "en";

  const analyzeImage = async () => {
    const analysisResult = await analyzeImages(imageUrl,features,language);
    setResult(analysisResult);
  };

  const generateImage = () => {
    // Add your code for image generation here
    setResult(`Generating image based on: ${imageUrl}`);
  };

  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
  };

  return (
    <div className="App">
      <h1>Image Analyzer and Generator</h1>
      <label htmlFor="imageURL">Enter Image URL:</label>
      <input
        type="text"
        id="imageURL"
        placeholder="https://example.com/image.jpg"
        value={imageUrl}
        onChange={handleInputChange}
      />
      <br />
      <button onClick={analyzeImage}>Analyze Image</button>
      <button onClick={generateImage}>Generate Image</button>
      {result && (
        <div>
          <p>Analysis Result:</p>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
