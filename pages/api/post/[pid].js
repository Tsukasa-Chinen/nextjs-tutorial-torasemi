export default (req, res) => {
  // aidとファイル名の[aid].jsは合わせる
  const {
    query: {pid}
  } = req

  res.end(`Post: ${pid}`)
}