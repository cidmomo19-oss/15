export default {
  async fetch(request) {
    // Langsung pake link yang kamu kasih
    const videoUrl = 'https://pixeldrain.com/api/file/9Dcv8AJS';

    try {
      const videoResponse = await fetch(videoUrl, {
        headers: {
          'Referer': 'https://pixeldrain.com/',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': '*/*',
          'Origin': 'https://pixeldrain.com'
        }
      });

      if (!videoResponse.ok) {
        return new Response(`Gagal ambil video: ${videoResponse.status} - ${videoResponse.statusText}`, { 
          status: videoResponse.status 
        });
      }

      const newHeaders = new Headers(videoResponse.headers);
      newHeaders.set('Content-Type', videoResponse.headers.get('Content-Type') || 'video/mp4');
      newHeaders.set('Access-Control-Allow-Origin', '*');

      return new Response(videoResponse.body, {
        status: videoResponse.status,
        statusText: videoResponse.statusText,
        headers: newHeaders
      });
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  }
};
