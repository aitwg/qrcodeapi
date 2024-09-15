# qrcodeapi
我們可以增加一個簡單的 API 功能來支持命令行操作。我們將使用 Node.js 來創建一個簡單的服務器,提供 API 端點。以下是實現這個功能的步驟:


npm init -y
npm install express node-fetch@2 qrcode
npm start

現在,用戶可以通過命令行工具如 curl 來使用這個 API:
"
這將返回一個 JSON 對象,包含原始 URL、短 URL 和二維碼的 Data URL。
5. 為了方便命令行使用,我們可以創建一個簡單的 shell 腳本 get_short_url.sh

使用方法:
chmod +x get_short_url.sh
./get_short_url.sh https://example.com

這個腳本需要安裝 jq 工具來解析 JSON。在大多數 Linux 系統上,可以通過包管理器安裝:

sudo apt-get install jq  # 對於 Ubuntu/Debian
sudo yum install jq      # 對於 CentOS/Fedora
brew install jq          # 對於 macOS (使用 Homebrew)

這樣,用戶就可以通過命令行獲取短網址和二維碼了。記得在運行腳本之前先啟動服務器。
