'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
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

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(ArticleSelector);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');

};

{

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';


  const GenerateTitleLinks = function () {

    /* [DONE] remove contents of titleList*/

    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';

    /* [DONE] for each article*/

    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for (let article of articles) {

      /* [DONE] Get the article id*/

      const ArticleId = article.getAttribute('id');

      /* [DONE] find the title element*/

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create html of the link*/

      const linkHTML = '<li><a href="#' + ArticleId + '"><span>' + articleTitle + '</span></a></li>';

      /* [DONE] insert link into html variable*/

      html = html + linkHTML;

      //titleList.insertAdjacentHTML('afterend', linkHTML);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

  };

  GenerateTitleLinks();

  function generateTags(){

    /* [DONE] find all articles */

    const articles = document.querySelectorAll(optArticleSelector);
    console.log('found articles:', articles);

    /* [DONE] START LOOP: for every article: */

    for (let article of articles){

      /* [DONE] find tags wrapper */

      const TagsWrapper = article.querySelector(optArticleTagsSelector);
      console.log('found tags wrapper:', TagsWrapper);

      /* [DONE] make html variable with empty string */

      let html = '';

      /* [DONE] get tags from data-tags attribute */

      const ArticleTags = article.getAttribute('data-tags');
      console.log('found tags:', ArticleTags);

      /* [DONE] split tags into array */

      const articleTagsArray = ArticleTags.split(' ');
      console.log('here is article tags array:', articleTagsArray);

        /* [DONE] START LOOP: for each tag */

        for(let tag of articleTagsArray){
        console.log('each tag:', tag);

          /* [DONE] generate HTML of the link */

          const tagHTML = '<li><a href="#tag-' + tag + '"> '+ tag +' </a></li>';
          console.log('genrated html of the link:', tagHTML);

          /* [DONE] add generated code to html variable */

          html = html + tagHTML;
          console.log('added generated code to html variable', html);

        /* [DONE] END LOOP: for each tag */
        }

      /* insert HTML of all the links into the tags wrapper */

      TagsWrapper.innerHTML = html;

    /* [DONE] END LOOP: for every article: */
    }

  }

  generateTags();

  //function tagClickHandler(event){
    //console.log('tagClickHandler');

    /* [DONE] prevent default action for this event */

    //event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    //const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    //const href = clickedElement.getAttribute('href');
    //console.log(href);

    /* make a new constant "tag" and extract tag from the "href" constant */

    //const tag = href.replace('#tag-', '');

    /* find all tag links with class active */

     //const ActiveTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */

    //for (let ActiveTagLink of ActiveTagLinks){

      /* remove class active */
      //ActiveTagLink = remove('active');

    /* END LOOP: for each active tag link */
    //}

    /* find all tag links with "href" attribute equal to the "href" constant */
    //FoundTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    //for (let FoundTagLink of FoundTagLinks){

      /* add class active */
      //FoundTagLink = add('active');

    /* END LOOP: for each found tag link */
    //}

    /* execute function "generateTitleLinks" with article selector as argument */
  //} //GenerateTitleLinks('[data-tags~="' + tag + '"]');

  //function addClickListenersToTags(){
    /* find all links to tags */
    //const TagLinks = document.querySelectorAll('a[href^="#tag-"]');

    /* START LOOP: for each link */
    //for (let TagLink of TagLinks){

      /* add tagClickHandler as event listener for that link */
      //TagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  //}
  //}

  //addClickListenersToTags();

}

