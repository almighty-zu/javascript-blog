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
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';


  const GenerateTitleLinks = function () {
    console.log('Title links are generated!' + GenerateTitleLinks);


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

  function generateTags(){
    console.log('Tags are generated!' + generateTags);

    /* [DONE] find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    console.log(articles);

    /* [DONE] START LOOP: for every article: */

    for (let article of articles) {

      /* [DONE] find tags wrapper */

      const TagsWrapper = article.querySelector(optArticleTagsSelector);

      console.log(TagsWrapper);

      /* [DONE] make html variable with empty string */

      let html = '';

      /* [DONE] get tags from data-tags attribute */

      const ArticleTags = article.getAttribute('data-tags');
      console.log(ArticleTags);

      /* [DONE] split tags into array */

      const articleTagsArray = ArticleTags.split(' ');
      console.log(articleTagsArray);

        /* [DONE] START LOOP: for each tag */

        for(let tag of articleTagsArray){
        console.log(tag);

          /* [DONE] generate HTML of the link */

          const linkHTML = '<li><a href="#' + tag + '"><span>' + tag + '</span></a></li>';

          console.log(linkHTML);

          /* [DONE] add generated code to html variable */

          html = html + linkHTML;
          console.log(html);

          /* [DONE] END LOOP: for each tag */
        }

    /* insert HTML of all the links into the tags wrapper */

    TagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
    }

  }

  generateTags();

}

