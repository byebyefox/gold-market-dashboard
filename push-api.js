const https = require('https');
const fs = require('fs');
const { execSync } = require('child_process');

// Get fresh token from gh CLI
const token = execSync('gh auth token', { encoding: 'utf8' }).trim();

// Read the index.html file
const filePath = 'd:\\iflow\\gold-market-publish\\index.html';
const content = fs.readFileSync(filePath);
const base64Content = content.toString('base64');

const owner = 'byebyefox';
const repo = 'gold-market-dashboard';
const path = 'index.html';

function apiRequest(method, urlPath, body) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: 'api.github.com',
      path: urlPath,
      method: method,
      headers: {
        'Authorization': 'token ' + token,
        'User-Agent': 'node-push',
        'Content-Type': 'application/json',
      }
    };
    if (body) {
      opts.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(body));
    }
    const req = https.request(opts, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function main() {
  // Step 1: Get current file sha
  console.log('Getting current file SHA...');
  const getRes = await apiRequest('GET', `/repos/${owner}/${repo}/contents/${path}`);
  console.log('GET status:', getRes.status);
  
  let sha = null;
  if (getRes.status === 200 && getRes.body.sha) {
    sha = getRes.body.sha;
    console.log('Current SHA:', sha);
  } else {
    console.log('File does not exist yet or error:', JSON.stringify(getRes.body).substring(0, 200));
  }

  // Step 2: PUT new content
  console.log('Pushing new content via API...');
  const putBody = {
    message: 'daily update: 2026-08-17',
    content: base64Content,
  };
  if (sha) putBody.sha = sha;

  const putRes = await apiRequest('PUT', `/repos/${owner}/${repo}/contents/${path}`, putBody);
  console.log('PUT status:', putRes.status);
  
  if (putRes.status === 200 || putRes.status === 201) {
    console.log('✅ Push successful!');
    console.log('Commit SHA:', putRes.body.commit?.sha);
  } else {
    console.log('Push failed:', JSON.stringify(putRes.body).substring(0, 500));
  }
}

main().catch(console.error);
