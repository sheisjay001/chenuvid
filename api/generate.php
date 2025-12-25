<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Get raw POST data
$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON input']);
    exit;
}

$prompt = $data->prompt ?? '';
$style = $data->style ?? '3d_cartoon';
$duration = $data->duration ?? 5;

if (empty($prompt)) {
    http_response_code(400);
    echo json_encode(['error' => 'Prompt is required']);
    exit;
}

// In a real application, you would call an AI API here.
// Examples of APIs you might use:
// - OpenAI DALL-E (for images) + Runway Gen-2 (for video)
// - Stability AI (Stable Video Diffusion)
// - ElevenLabs (for Voice)
//
// Since we are simulating, we will log the request and return a mock response.

$requestId = uniqid();
$logFile = '../assets/requests.log';
$logEntry = sprintf("[%s] ID: %s | Style: %s | Prompt: %s\n", date('Y-m-d H:i:s'), $requestId, $style, $prompt);
file_put_contents($logFile, $logEntry, FILE_APPEND);

// Simulate processing time (frontend handles visual progress, but backend might take a moment)
sleep(1);

// Select a mock video based on style (just for flavor, though we point to the same sample for now)
// In a real app, this URL would be the result from the AI service.
$mockVideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";

echo json_encode([
    'success' => true,
    'message' => 'Video generated successfully',
    'request_id' => $requestId,
    'video_url' => $mockVideoUrl,
    'metadata' => [
        'duration' => $duration,
        'style' => $style,
        'generated_at' => date('c')
    ]
]);
