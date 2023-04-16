/**
 * 删除记录
 * @param {string} id
 */
async function deleteRecord(url, id) {
  const res = await ajax(url, 'POST', { id });
  if (res.status === 200) {
    location.reload();
  }
}

/**
 * 重置
 */
reset.onclick = async () => {
  location.href = location.pathname;
}

/**
 * 跳转至修改页面
 */
async function edit(id) {
  location.href = `/record/edit/${id}`;
}