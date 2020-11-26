'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement', clickedElement);

  clickedElement.classList.add('active');


  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .post.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const ArticleSelector = clickedElement.getAttribute('href');
  console.log(ArticleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(ArticleSelector);

  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');

};

{

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  const GenerateTitleLinks = function () {
    console.log('Title links were generated!');


    /* [DONE] remove contents of titleList*/

    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';

    /* [DONE] for each article*/

    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for (let article of articles) {

      /* [DONE] Get the article id*/

      const ArticleId = article.getAttribute('id');
      console.log(ArticleId);

      /* [DONE] find the title element*/

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create html of the link*/

      const linkHTML = '<li><a href="#' + ArticleId + '"><span>' + articleTitle + '</span></a></li>';

      /* [DONE] insert link into html variable*/

      html = html + linkHTML;

      //titleList.insertAdjacentHTML('afterend', linkHTML);
    }

    titleList.innerHTML = html;

    console.log('html');

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

  };

  GenerateTitleLinks();

}