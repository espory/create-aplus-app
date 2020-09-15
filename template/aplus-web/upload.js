const compressing = require('compressing');
const FormData = require('form-data');
const fs = require('fs');
const http = require('http');

const host = '139.196.236.96';

async function deploy() {
  try {
    await compressing.zip.compressDir('./dist', './source.gz', { ignoreBase: true });
    const form = new FormData();
    form.append('file', fs.createReadStream('./source.gz'));// 'file'是服务器接受的key
    const headers = form.getHeaders();
    // headers.Cookie = cookie;
    const request = http.request({
      method: 'post',
      host,
      port: 7001,
      path: '/upload',
      headers,
    }, function(res) {
      let str = '';
      res.on('data', function(buffer) {
        str += buffer;// 用字符串拼接
      }
      );
      res.on('end', () => {
        const result = JSON.parse(str);
        console.log(result);
      });
    });
    form.pipe(request);
    fs.unlinkSync('./source.gz');
  } catch (e) {
    console.log(e);
  }
}

deploy();
