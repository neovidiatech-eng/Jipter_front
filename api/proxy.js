// Vercel serverless proxy function
// Forwards requests to perfect-due.com server-side (no browser Origin header)
export default async function handler(req, res) {
  const { path = [] } = req.query;
  const targetPath = Array.isArray(path) ? path.join('/') : path;
  const targetUrl = `https://perfect-due.com/${targetPath}`;

  // Forward query params (excluding 'path')
  const url = new URL(targetUrl);
  Object.entries(req.query).forEach(([key, value]) => {
    if (key !== 'path') url.searchParams.append(key, value);
  });

  // Forward headers but strip browser-specific and length headers
  const headers = {};
  for (const [key, value] of Object.entries(req.headers)) {
    const lowerKey = key.toLowerCase();
    if (!['host', 'origin', 'referer', 'content-length', 'connection', 'host'].includes(lowerKey)) {
      headers[key] = value;
    }
  }

  // Ensure content-type is set for POST/PATCH/PUT
  if (!headers['content-type'] && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const fetchOptions = {
      method: req.method,
      headers,
    };

    if (!['GET', 'HEAD'].includes(req.method) && req.body) {
      // Only stringify if it's not already a string
      fetchOptions.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const response = await fetch(url.toString(), fetchOptions);
    const data = await response.json();

    // Forward response headers
    res.setHeader('Content-Type', 'application/json');
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Proxy error', error: error.message });
  }
}
