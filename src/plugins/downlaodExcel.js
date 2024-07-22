import axios from 'axios';

export function downloadExcel(url,filename) {
  axios({
    url: url,
    method: 'get',
    responseType: 'blob'
  })
 .then(response => {
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
  })
 .catch(error => {
    console.error('下载出错：', error);
  });
}