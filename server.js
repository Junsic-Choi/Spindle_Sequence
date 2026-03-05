const http = require('http');
const fs = require('fs');
const path = require('path');

// 환경 변수 PORT가 셋팅되어 있다면 무시하고 새로운 포트로 하드코딩하여 연결
const PORT = 8282;

const server = http.createServer((req, res) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    // 기본 경로는 index.html 제공
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);

    // 확장자에 따른 Content-Type 설정
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 Not Found</h1><p>해당 파일을 찾을 수 없습니다.</p>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType + '; charset=utf-8' });
            res.end(content, 'utf-8');
        }
    });
});

// 호스트 '0.0.0.0'을 지정하여 사내망(외부)에서도 IP 주소로 접속할 수 있도록 허용
server.listen(PORT, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`스핀들직 작업 순서 관리 서버가 실행되었습니다.`);
    console.log(`사내 네트워크 접속용 주소: http://10.33.56.86:${PORT}`);
    console.log(`로컬 PC 접속용 주소: http://localhost:${PORT}`);
    console.log(`서버 종료: Ctrl + C`);
    console.log(`=======================================================`);
});
