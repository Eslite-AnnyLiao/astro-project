import https from 'node:https';
import fs from 'node:fs';
import handler from 'serve-handler';

const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
};

const server = https.createServer(options, (req, res) => {
  // 指向 Astro build 出來的 dist 資料夾
  return handler(req, res, { 
    public: 'dist',
    headers: [
      {
        source: '**/*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache'
          }
        ]
      }
    ]
  });
});

const port = 8080;

server.listen(port, () => {
  console.log(`🚀 HTTPS Preview server running at:`);
  console.log(`   Local: https://localhost:${port}/`);
  console.log(`   Network: https://192.168.52.129:${port}/`);
});

// 錯誤處理
server.on('error', (err) => {
  console.error('Server error:', err);
});