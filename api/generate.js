export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const { prompt, style = '3d_cartoon', duration = 5 } = req.body;

        if (!prompt) {
            res.status(400).json({ error: 'Prompt is required' });
            return;
        }

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const requestId = Math.random().toString(36).substring(7);
        const mockVideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";

        res.status(200).json({
            success: true,
            message: 'Video generated successfully',
            request_id: requestId,
            video_url: mockVideoUrl,
            metadata: {
                duration,
                style,
                generated_at: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}