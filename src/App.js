import React, { useState } from 'react';
import {analyzeImages,analyzeImagesIsConfigured} from './azure-image-analysis';
import {generateImages,generateImagesIsConfigured} from './azure-image-generation';
import './App.css';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState('');
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const features = "caption";
  const language = "en";

  const analyzeImage = async () => {
    await fetchImage();
    const analysisResult = await analyzeImages(imageUrl,features,language);
    setResult(analysisResult);
  };

  const generateImage = async () => {
    setLoading(true);
    const generateResult = await generateImages(imageUrl);
    setResult(generateResult);
    setLoading(false);
  };

  const fetchImage = async () => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const imageBlob = await response.blob();
      const imageURL = URL.createObjectURL(imageBlob);
      setImageData(imageURL);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
  };

  const analyzeIsConfig = analyzeImagesIsConfigured();
  const generateIsConfig = generateImagesIsConfigured();

  if(analyzeIsConfig === false || generateIsConfig === false){
    return(
      <div className="App">
        <h1>key and/or endpoint not configured for cognitive services</h1>
      </div>

    );
  }
  else{

    return (
      <div className="App">
        <h1>Image Analyzer and Generator</h1>
        <label htmlFor="imageURL">Enter Image URL or type prompt:</label>
        <input
          type="text"
          id="imageURL"
          placeholder="https://example.com/image.jpg"
          value={imageUrl}
          onChange={handleInputChange}
        />
        <br />
        <button onClick={analyzeImage}>Analyze Image</button>
        <button onClick={generateImage} disabled={loading}>Generate Image</button>
        {result && (
          <div>
            <p>Analysis Result:</p>
            {imageData && <img src={imageData} alt="Fetched" />}
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }
  
}

export default App;
