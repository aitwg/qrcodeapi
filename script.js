document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const generateBtn = document.getElementById('generateBtn');
    const shortUrlDiv = document.getElementById('shortUrl');
    const qrcodeDiv = document.getElementById('qrcode');
    const downloadBtn = document.getElementById('downloadBtn');

    generateBtn.addEventListener('click', generateShortUrlAndQRCode);
    downloadBtn.addEventListener('click', downloadQRCode);

    async function generateShortUrlAndQRCode() {
        const url = urlInput.value.trim();
        if (url) {
            try {
                const shortUrl = await createShortUrl(url);
                shortUrlDiv.textContent = `短網址: ${shortUrl}`;
                generateQRCode(shortUrl);
                downloadBtn.style.display = 'inline-block';
            } catch (error) {
                console.error('生成短網址失敗:', error);
                alert('生成短網址失敗，請重試');
            }
        }
    }

    async function createShortUrl(url) {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
            throw new Error('短網址生成失敗');
        }
        return await response.text();
    }

    function generateQRCode(url) {
        qrcodeDiv.innerHTML = '';
        const qr = qrcode(0, 'L');
        qr.addData(url);
        qr.make();
        qrcodeDiv.innerHTML = qr.createImgTag(5);
    }

    function downloadQRCode() {
        const img = qrcodeDiv.querySelector('img');
        if (img) {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height);
            
            canvas.toBlob((blob) => {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'qrcode.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(a.href);
                alert('二維碼圖像已下載，請從下載文件夾中複製');
            }, 'image/png');
        }
    }
});