(function () {

  //очистить поле
  function deleteField() {
    const linkAll = document.querySelectorAll('.articles__link');
    for (let i = 0; i < linkAll.length; i++) {
      linkAll[i].remove();
    }
  }

  //отрисовать список ссылок
  function createElement(title, id) {
    const articlesBlock = document.querySelector('.articles');
    const link = document.createElement('a');

    link.textContent = `${title}`;
    link.setAttribute('href', `article.html?post=${id}`);
    link.classList.add('articles__link', 'mb-3', 'p-3', 'text-light', 'bg-success');
    articlesBlock.append(link);
  }

  //получить с сервера список статей
  async function getArticles(page) {
    const response = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);
    const result = await response.json();

    result.data.forEach(element => {
      createElement(element.title, element.id);
    });
  }

  getArticles(1);

  if (window.performance) {
    const initialValue = window.location.pathname;
    window.history.pushState('', '', initialValue);
  }

  const pagination = document.querySelector('.pagination');

  pagination.addEventListener('click', (e) => {
    e.preventDefault();
    deleteField();

    let pageItem = e.target.closest('li');
    let linkItem = pageItem.querySelector('a').href;

    if (!pageItem) return;

    window.history.pushState('', '', linkItem);

    const activePage = document.querySelector('.active');

    activePage.classList.remove('active');
    pageItem.classList.add('active');

    const pageParams = window.location.search;
    const params = new URLSearchParams(pageParams);
    const pageNumber = parseInt(params.get("page"));

    if (pageNumber > 1) {
      getArticles(pageNumber);
    } else {
      getArticles(1);
    }
  })
})();
