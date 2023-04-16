/**
 *
 * @param {string} url 请求路径
 * @param {string} method 请求方式
 * @param {Object | undefined} body 请求参数
 * @returns {Promise<unknown>}
 */
function ajax(url, method = 'GET', body) {
  const xhr = new XMLHttpRequest();

  const params = new URLSearchParams(body).toString();

  if (method === 'GET') {
    xhr.open(method, `${url}?${params}`, true);
    xhr.setRequestHeader('content-type', 'application/json;charset=utf-8');
    xhr.send(null);
  } else {
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.send(JSON.stringify(body));
  }

  return new Promise(resolve => {
    xhr.onreadystatechange = async () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch (err) {
          console.error(err);
        }
      }
    }
  })
}
