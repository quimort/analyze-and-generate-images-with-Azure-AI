

async function analyzeImages(imageURL,features,language){

    const visionkey = process.env.REACT_APP_VISION_KEY;
    const visionendpoint = process.env.REACT_APP_VISION_ENDPOINT;
    console.log('VISION_ENDPOINT:', process.env.REACT_APP_VISION_ENDPOINT);
    const apiUrl = `${visionendpoint}computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=${features}&language=${language}`
    try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': visionkey
          },
          body: {
            'url':imageURL
          },
        });
        console.log(response.json())
        if (!response.ok) {
            throw new Error('API request failed');
          }
    
          const data = await response.json();
          return data;
    } 
    catch (error) {
        console.error('Error:', error);
        return null;
    }
    


}
export default analyzeImages;