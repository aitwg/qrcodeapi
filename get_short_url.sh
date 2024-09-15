#!/bin/bash

if [ $# -eq 0 ]; then
    echo "請提供一個 URL"
    exit 1
fi

url=$1
response=$(curl -s "http://localhost:3000/api/shorturl?url=$url")

short_url=$(echo $response | jq -r .shortUrl)
qr_code=$(echo $response | jq -r .qrCode)

echo "原始 URL: $url"
echo "短網址: $short_url"
echo "二維碼 Data URL: $qr_code"

# 可選: 將二維碼保存為圖片文件
echo $qr_code | sed 's/^data:image\/png;base64,//' | base64 --decode > qrcode.png
echo "二維碼已保存為 qrcode.png"