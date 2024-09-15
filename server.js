const express = require('express');
const fetch = require('node-fetch');
const QRCode = require('qrcode');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/shorturl', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ error: '請提供 URL' });
    }

    try {
        const shortUrl = await createShortUrl(url);
        const qrCodeDataUrl = await QRCode.toDataURL(shortUrl);

        res.json({
            originalUrl: url,
            shortUrl: shortUrl,
            qrCode: qrCodeDataUrl
        });
    } catch (error) {
        res.status(500).json({ error: '生成短網址或二維碼失敗' });
    }
});

async function createShortUrl(url) {
    const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
        throw new Error('短網址生成失敗');
    }
    return await response.text();
}

app.listen(port, () => {
    console.log(`服務器運行在 http://localhost:${port}`);
});