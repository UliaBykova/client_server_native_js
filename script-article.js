(function () {

  function fillInAComment(name, text) {
    const nameComments = document.querySelector('.comments__name');
    const textComments = document.querySelector('.comments__text');

    nameComments.textContent = name;
    textComments.textContent = text;
  }

  function fillInTheCard(title, body) {
    const cardTitle = document.querySelector('.card-title');
    const cardText = document.querySelector('.card-text');

    cardTitle.textContent = title;
    cardText.textContent = body;
  }

  //получить с сервера контент поста
  async function getContent(id) {
    const response = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
    const result = await response.json();

    fillInTheCard(result.data.title, result.data.body)
  }

  //получить с сервера комментарии
  async function getComments(id) {
    const response = await fetch(`https://gorest.co.in/public-api/comments?post_id=${id}`);
    const result = await response.json();

    if (result.data.length > 0) {
      fillInAComment(result.data[0].name, result.data[0].body);
    }
  }

  const postParams = window.location.search;
  const params = new URLSearchParams(postParams);
  const postId = parseInt(params.get("post"));

  getContent(postId);
  getComments(postId);

})();
