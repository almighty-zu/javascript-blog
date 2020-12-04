'use strict';

const titleClickHandler = function(event){
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

  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');

};

{

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelecotr = '.list .tags';


  const generateTitleLinks = function(customSelector = ''){

    /*[DONE] remove contents of titleList*/

    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';

    /*[DONE] for each article*/

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for (let article of articles) {

      /*[DONE] Get the article id*/

      const articleId = article.getAttribute('id');

      /*[DONE] find the title element*/

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /*[DONE] create html of the link*/

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /*[DONE] insert link into html variable*/

      html = html + linkHTML;

      //titleList.insertAdjacentHTML('afterend', linkHTML);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

  };

  generateTitleLinks();

  // eslint-disable-next-line no-inner-declarations
  const generateTags = function(){

    /*[DONE] create a new variable allTags with an empty object*/

    let allTags = {};
    console.log(allTags);

    /*[DONE] find all articles*/

    const articles = document.querySelectorAll(optArticleSelector);
    console.log('found articles:', articles);

    /*[DONE] START LOOP: for every article:*/

    for (let article of articles){

      /*[DONE] find tags wrapper*/

      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      console.log('found tags wrapper:', tagsWrapper);

      /*[DONE] make html variable with empty string*/

      let html = '';

      /*[DONE] get tags from data-tags attribute*/

      const articleTags = article.getAttribute('data-tags');
      console.log('found tags:', articleTags);

      /*[DONE] split tags into array*/

      const articleTagsArray = articleTags.split(' ');
      console.log('here is article tags array:', articleTagsArray);

      /*[DONE] START LOOP: for each tag*/

      for(let tag of articleTagsArray){
        console.log('each tag:', tag);

        /*[DONE] generate HTML of the link*/

        const tagHTML = '<li><a href="#tag-' + tag + '"> '+ tag +' </a></li>';
        console.log('genrated html of the link:', tagHTML);

        /*[DONE] add generated code to html variable*/

        html = html + tagHTML;
        console.log('added generated code to html variable', html);

        /*[DONE] check if this link in NOT already in all tags*/

        if(!allTags[tag]) {

          /*[DONE] Add generated code to allTags object*/

          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }


      /*[DONE] END LOOP: for each tag*/
      }

      /*insert HTML of all the links into the tags wrapper*/

      tagsWrapper.innerHTML = html;

    /*[DONE] END LOOP: for every article*/
    }

    /*[DONE] find list of tags in the right column*/

    const tagList = document.querySelector('.tags');

    /*add html from allTags to tagsList*/
    //tagList.innerHTML = allTags.join(' ');
    //console.log(allTags);

    /*[DONE] create variable for all links HTML code*/

    let allTagsHTML = '';

    /*[DONE] start LOOP: for each tag in allTags*/

    for (let tag in allTags){

      /*[DONE] generate code of a link and add it to allTagsHTML*/
      //allTagsHTML += tag + ' (' + allTags[tag] +') ';

      allTagsHTML += '<li><a href="#tag-' + tag + '"> ' + tag + '(' + allTags[tag] + ')</a></li>';

    /*END LOOP: for each tag in AllTags:*/
    }

    /*add HTML from allTagsHTML to tagList*/

    tagList.innerHTML = allTagsHTML;

  };

  generateTags();

  // eslint-disable-next-line no-inner-declarations
  const tagClickHandler = function(event){

    /*[DONE] prevent default action for this event*/

    event.preventDefault();

    /*[DONE] make new constant named "clickedElement" and give it the value of "this"*/

    const clickedElement = this;

    /*[DONE] make a new constant "href" and read the attribute "href" of the clicked element*/

    const href = clickedElement.getAttribute('href');

    /*[DONE] make a new constant "tag" and extract tag from the "href" constant*/

    const tag = href.replace('#tag-', '');

    /*[DONE] find all tag links with class active*/

    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /*[DONE] START LOOP: for each active tag link*/

    for (let activeTagLink of activeTagLinks){

      /*[DONE] remove class active*/

      activeTagLink.classList.remove('active');

    /*[DONE] END LOOP: for each active tag link*/
    }

    /*[DONE] find all tag links with "href" attribute equal to the "href" constant*/

    const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /*[DONE] START LOOP: for each found tag link*/

    for (let foundTagLink of foundTagLinks){

      /*[DONE] add class active*/

      foundTagLink.classList.add('active');

      /*[DONE] END LOOP: for each found tag link*/
    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');

  };

  // eslint-disable-next-line no-inner-declarations
  const addClickListenersToTags = function(){

    /*[DONE] find all links to tags*/

    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

    /*[DONE] START LOOP: for each link*/

    for (let tagLink of tagLinks){

      /*[DONE] add tagClickHandler as event listener for that link*/

      tagLink.addEventListener('click', tagClickHandler);

    /*[DONE] END LOOP: for each link*/
    }
  };

  addClickListenersToTags();

  // eslint-disable-next-line no-inner-declarations
  const generateAuthors = function(){

    /*[DONE] find all articles*/

    const articles = document.querySelectorAll(optArticleSelector);
    console.log('found articles', articles);

    /*[DONE] START LOOP for every article*/

    for (let article of articles){

      /*[DONE] find author wrapper*/

      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      console.log('author wrapper', authorWrapper);

      /*[DONE] make html variable with an empty string*/

      let html = '';

      /*[DONE] get tags from data-author attribute*/

      const articleAuthor = article.getAttribute('data-author');
      console.log('article author', articleAuthor);

      /*[DONE] generate html of the link*/

      const authorHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
      console.log('authorHTML', authorHTML);

      /*[DONE] add generated code to the html variable*/

      html = authorHTML + html;
      console.log(html);

      /*[DONE] insert HTML of all the links into the authors wrapper*/

      authorWrapper.innerHTML = html;

    /*[DONE] END LOOP for every article*/
    }
  };

  generateAuthors();

  // eslint-disable-next-line no-inner-declarations
  const authorClickHandler = function(event){

    /*[DONE] prevent default action for this event*/

    event.preventDefault();

    /*[DONE] make new constant named "clickedElement" and give it the value of "this"*/

    const clickedElement = this;

    /*[DONE] make a new constant "href" and read the attribute "href" of the clicked element*/

    const href = clickedElement.getAttribute('href');

    /*[DONE] make a new constant "author" and extract author from the "href" constant*/

    const author = href.replace('#author-', '');

    /*[DONE] find all author links with class active*/

    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /*[DONE] START LOOP: for each active author link*/

    for (let activeAuthorLink of activeAuthorLinks){

      /*[DONE] remove class active*/

      activeAuthorLink.classList.remove('active');

      /*[DONE] END LOOP: for each active author link*/
    }

    /*[DONE] find all author links with "href" attribute equal to the "href" constant*/

    const foundAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');

    /*[DONE] START LOOP: for each found tag link*/
    for (let foundAuthorLink of foundAuthorLinks){

      /*[DONE] add class active*/

      foundAuthorLink.classList.add('active');

    /*[DONE] END LOOP: for each found author link*/
    }

    /*[DONE] execute function "generateTitleLinks" with article selector as argument*/

    generateTitleLinks('[data-author="' + author + '"]');
  };

  // eslint-disable-next-line no-inner-declarations
  const addClickListenersToAuthors = function(){

    /*[DONE] find all links to authors*/

    const authorLinks = document.querySelectorAll('a[href^="#author-"]');

    /*[DONE] START LOOP: for each link*/

    for (let authorLink of authorLinks){

      /*[DONE] add tagClickHandler as event listener for that link*/

      authorLink.addEventListener('click', authorClickHandler);

    /*[DONE] END LOOP: for each link */
    }

  };

  addClickListenersToAuthors();

}
