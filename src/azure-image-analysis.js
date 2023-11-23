

export async function analyzeImages(imageURL,features,language){

    const visionkey = process.env.REACT_APP_VISION_KEY;
    const visionendpoint = process.env.REACT_APP_VISION_ENDPOINT;
    const apiUrl = `${visionendpoint}computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=${features}&language=${language}`
    try {
        const body = JSON.stringify({
          url: imageURL,
        });
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': visionkey
          },
          body: body,
        });
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
export function analyzeImagesIsConfigured(){

  const requiredVariables = ['REACT_APP_VISION_KEY', 'REACT_APP_VISION_ENDPOINT'];

    for (const variable of requiredVariables) {
    if (!process.env[variable] || process.env[variable].trim() === '') {
        return false;
    }
    }

    return true;
}
