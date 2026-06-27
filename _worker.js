export default {
  async fetch(request) {
    const url = new URL(request.url);
    const videoUrl = url.searchParams.get('url');
    if (!videoUrl) {
      return new Response('Missing video URL', { status: 400 });
    }

    try {
      const videoResponse = await fetch(videoUrl, {
        headers: {
          'Referer': 'https://pixeldrain.com/', // <- PERHATIKAN SLASH DI AKHIR
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': '*/*', // <- TAMBAHKAN INI
          'Accept-Language': 'en-US,en;q=0.9',
          'Origin': 'https://pixeldrain.com' // <- TAMBAHKAN ORIGIN
        }
      });

      if (!videoResponse.ok) {
        return new Response(`Gagal ambil video: ${videoResponse.status}`, { status: videoResponse.status });
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
