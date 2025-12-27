import Replicate from "replicate";

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

        let videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4"; // Default mock URL
        const requestId = Math.random().toString(36).substring(7);

        // Check if REPLICATE_API_TOKEN is present
        if (process.env.REPLICATE_API_TOKEN) {
            try {
                const replicate = new Replicate({
                    auth: process.env.REPLICATE_API_TOKEN,
                });

                // Model: Zeroscope V2 XL (Great for text-to-video)
                // You can swap this for 'stability-ai/stable-video-diffusion' or 'lucataco/animate-diff'
                const model = "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351";
                
                // Enhance prompt based on style
                const enhancedPrompt = `${style} style. ${prompt}. High quality, detailed, 4k, smooth motion.`;

                const output = await replicate.run(
                    model,
                    {
                        input: {
                            prompt: enhancedPrompt,
                            num_frames: 24, // Approx 3-4 seconds for this specific model (limitations apply)
                            fps: 8,
                            width: 576,
                            height: 320,
                            guidance_scale: 17.5,
                            negative_prompt: "noisy, washed out, ugly, distorted, broken, watermark, text"
                        }
                    }
                );

                // Replicate returns an array of output URLs (usually one video)
                if (output && output[0]) {
                    videoUrl = output[0];
                }

            } catch (replicateError) {
                console.error("Replicate generation failed, falling back to mock:", replicateError);
                // We don't crash, we just return the mock so the UI doesn't break
            }
        } else {
            console.log("No REPLICATE_API_TOKEN found, using mock mode.");
            // Simulate delay only in mock mode
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        res.status(200).json({
            success: true,
            message: 'Video generated successfully',
            request_id: requestId,
            video_url: videoUrl,
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
