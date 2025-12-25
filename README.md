# ChenuVid - AI Cartoon Generator

This is a web application skeleton for generating cartoon videos from text descriptions.

## Structure

- `index.php`: The main user interface.
- `api/generate.php`: The backend script that handles requests.
- `assets/`: Directory for storing generated files.

## How to make it "Real"

Currently, the application simulates the video generation process (returning a sample video). To make it generate real cartoons, you need to integrate AI APIs in `api/generate.php`.

### Recommended Stack for Real Generation:

1.  **Script & Storyboard**: Use **OpenAI API (GPT-4)** to convert the user's prompt into a scene-by-scene script.
2.  **Image Generation**: Use **DALL-E 3** or **Midjourney (via API)** or **Stable Diffusion** to generate keyframes for each scene.
3.  **Video Generation**: Use **Runway Gen-2 API** or **Stability AI Video API** to animate the images.
4.  **Voiceover**: Use **ElevenLabs API** to generate audio from the script.
5.  **Assembly**: Use `FFmpeg` (server-side) to combine the video clips and audio into a final `.mp4` file.

## Setup

1.  Ensure XAMPP is running (Apache).
2.  Place this folder in `htdocs`.
3.  Open `http://localhost/chenuvid` in your browser.
