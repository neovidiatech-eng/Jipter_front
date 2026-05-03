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

  // Forward headers but strip browser-specific ones
  const headers = { ...req.headers };
  delete headers['host'];
  delete headers['origin'];
  delete headers['referer'];
  headers['Content-Type'] = headers['content-type'] || 'application/json';

  try {
    const fetchOptions = {
      method: req.method,
      headers,
    };

    if (!['GET', 'HEAD'].includes(req.method)) {
      fetchOptions.body = JSON.stringify(req.body);
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
