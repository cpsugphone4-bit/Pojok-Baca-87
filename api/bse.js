{
  "version": 2,
  "name": "pojok-baca-87-bse-only",
  "builds": [
    {
      "src": "api/bse.js",
      "use": "@vercel/node"
    },
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/bse",
      "dest": "/api/bse.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
