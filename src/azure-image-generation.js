
export async function generateImages(prompt){

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const apiEndPoint = process.env.REACT_APP_OPENAI_API_ENDPOINT;

    try{

        const response = await fetch(apiEndPoint,{
            method: 'POST',

            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "dall-e-2",
                prompt:prompt,
                n:1
                // You may include additional parameters based on the OpenAI API documentation
            })
        });
        console.log(response.json())
        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data;
    }
    catch(error){
        console.error('Error:', error);
        return null;
    }


}

export function generateImagesIsConfigured(){

    const requiredVariables = ['REACT_APP_OPENAI_API_KEY', 'REACT_APP_OPENAI_API_ENDPOINT'];

    for (const variable of requiredVariables) {
    if (!process.env[variable] || process.env[variable].trim() === '') {
        return false;
    }
    }

    return true;
}