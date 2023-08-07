// prettier-ignore
function getCurrentDate() {
  const postDate = new Date();

  const month = postDate.getMonth() <= 9 ? "0" + postDate.getMonth() : postDate.getMonth();
  const day = postDate.getDate() <= 9 ? "0" + postDate.getDate() : postDate.getDate();
  const hours = postDate.getHours() <= 9 ? "0" + postDate.getHours() : postDate.getHours();
  const minutes = postDate.getMinutes() <= 9 ? "0" + postDate.getMinutes() : postDate.getMinutes();

  return postDate.getFullYear + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + "00:00";
}

module.exports = {
  getCurrentDate,
};
