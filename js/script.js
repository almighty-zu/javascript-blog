'use strict';

{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
  };

  const opts = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    articleAuthorSelector: '.post-author',
    tagsListSelector: '.tags.list',
    authorsListSelector: '.authors.list',
    cloudClassCount: 5,
    cloudClassPrefix: 'cloud-element-size-'
  };

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    /*[DONE] remove class 'active' from all article links*/

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /*[DONE] add class 'active' to the clicked link*/

    clickedElement.classList.add('active');
    console.log('clickedElement', clickedElement);

    /*[DONE] remove class 'active' from all articles*/

    const activeArticles = document.querySelectorAll('.posts .post.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /*[DONE] get 'href' attribute from the clicked link*/

    const articleSelector = clickedElement.getAttribute('href');

    /*[DONE] find the correct article using the selector (value of 'href' attribute)*/

    const targetArticle = document.querySelector(articleSelector);

    /*[DONE] add class 'active' to the correct article*/

    targetArticle.classList.add('active');

  };

  const generateTitleLinks = function(customSelector = ''){

    /*[DONE] remove contents of titleList*/

    const titleList = document.querySelector(opts.titleListSelector);

    titleList.innerHTML = '';

    /*[DONE] for each article*/

    const articles = document.querySelectorAll(opts.articleSelector + customSelector);

    let html = '';

    for (let article of articles) {

      /*[DONE] Get the article id*/

      const articleId = article.getAttribute('id');

      /*[DONE] find the title element*/

      const articleTitle = article.querySelector(opts.titleSelector).innerHTML;

      /*[DONE] create html of the link*/
     //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

     const linkHTMLData = {id: articleId, title: articleTitle};
     const linkHTML = templates.articleLink(linkHTMLData);

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

  /*[DONE] Add new function calculateTagsParams*/
  // eslint-disable-next-line no-inner-declarations
  const calculateTagsParams = function(tags){
    console.log('calculate tags params', calculateTagsParams);

    const params = {
      max: 0,
      min: 99999
    };

    for (let tag in tags){
      console.log(tag + ' is used '+ tags[tag] + ' times ');
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }

    }

    return params;
  };

  /*[DONE] Add function calculateTagClass*/

  const calculateTagClass = function(count, params){

    const normalizedCount = count - params.min;

    const normalizedMax = params.max - params.min;

    const percentage = normalizedCount / normalizedMax;

    const classNumber = Math.floor( percentage * (opts.cloudClassCount - 1) + 1 );

    return opts.cloudClassPrefix + classNumber;

  };

  // eslint-disable-next-line no-inner-declarations
  const generateTags = function(){
    console.log(generateTags);

    /*[DONE] create a new variable allTags with an empty object*/

    let allTags = {};
    console.log(allTags);

    /*[DONE] find all articles*/

    const articles = document.querySelectorAll(opts.articleSelector);
    console.log('found articles:', articles);

    /*[DONE] START LOOP: for every article:*/

    for (let article of articles){

      /*[DONE] find tags wrapper*/

      const tagsWrapper = article.querySelector(opts.articleTagsSelector);
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
        //const tagHTML = '<li><a href="#tag-' + tag + '"> '+ tag +' </a></li>';

        const linkHTMLData = {tagId: tag, tag: tag};
        const linkHTML = templates.tagLink(linkHTMLData);

        /*[DONE] add generated code to html variable*/

        html = html + linkHTML;

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

      /*[DONE] insert HTML of all the links into the tags wrapper*/

      tagsWrapper.innerHTML = html;

    /*[DONE] END LOOP: for every article*/
    }

    /*[DONE] find list of tags in the right column*/

    const tagList = document.querySelector(opts.tagsListSelector);

    /*add html from allTags to tagsList*/
    //tagList.innerHTML = allTags.join(' ');
    //console.log(allTags);

    /*[DONE] make new const tagsParams*/

    const tagsParams = calculateTagsParams(allTags);
    console.log('tags params:', tagsParams);

    /*[DONE] create variable for all links HTML code*/
    //let allTagsHTML = '';

    const allTagsData = {tags: []};

    /*[DONE] start LOOP: for each tag in allTags*/

    for (let tag in allTags){

      /*[DONE] generate code of a link and add it to allTagsHTML*/

      //allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '"> ' + tag + '</a></li>';
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });


    /*END LOOP: for each tag in AllTags:*/
    }

    /*add HTML from allTagsHTML to tagList*/

    //tagList.innerHTML = allTagsHTML;
    //console.log(allTagsHTML);
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log('allTagsData',allTagsData);

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

  /*[DONE] Add new function calculateAuthorsParams based on calculateTagsParams*/
  // eslint-disable-next-line no-inner-declarations
  function calculateAuthorsParams(authors) {
    console.log('calculateAuthorsParams', calculateAuthorsParams);

    const params = {
      max: 0,
      min: 99999
    };

    for (let articleAuthor in authors){
      console.log(articleAuthor+ ' is used '+ authors[articleAuthor] + ' times ');
      if(authors[articleAuthor] > params.max){
        params.max = authors[articleAuthor];
      }
      if(authors[articleAuthor] < params.min){
        params.min = authors[articleAuthor];
      }

    }

    return params;

  }

  /*[DONE] add new function calculateAuthorsClass based on calculateTagsClass*/

  const calculateAuthorsClass = function(count, params) {

    const normalizedCount = count - params.min;

    const normalizedMax = params.max - params.min;

    const percentage = normalizedCount / normalizedMax;

    const classNumber = Math.floor( percentage * (opts.cloudClassCount - 1) + 1 );

    return opts.cloudClassPrefix + classNumber;

  };

  // eslint-disable-next-line no-inner-declarations
  const generateAuthors = function(){

    /*[DONE] create a new variable allAuthors with an empty object*/

    let allAuthors = {};

    /*[DONE] find all articles*/

    const articles = document.querySelectorAll(opts.articleSelector);
    console.log('found articles', articles);

    /*[DONE] START LOOP for every article*/

    for (let article of articles){

      /*[DONE] find author wrapper*/

      const authorWrapper = article.querySelector(opts.articleAuthorSelector);
      console.log('author wrapper', authorWrapper);

      /*[DONE] make html variable with an empty string*/

      let html = '';

      /*[DONE] get tags from data-author attribute*/

      const articleAuthor = article.getAttribute('data-author');
      console.log('article author', articleAuthor);

      /*[DONE] generate html of the link*/
      //const authorHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
      //console.log('authorHTML', authorHTML);

      const linkHTMLData = {authorId: articleAuthor, authorName: articleAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);

      /*[DONE] add generated code to the html variable*/

      html = linkHTML + html;
      console.log(html);

      /*[DONE] check if this link is NOT already in allAuthors*/

      if(!allAuthors[articleAuthor]) {
        /*[DONE] add author to allAuthors object*/
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      /*[DONE] insert HTML of all the links into the authors wrapper*/

      authorWrapper.innerHTML = html;

    /*[DONE] END LOOP for every article*/
    }

    /*[DONE] find list of articles in the right column*/

    const authorsList = document.querySelector(opts.authorsListSelector);
    console.log('authors list', authorsList)  ;

    /*[DONE] add html from allTags to tagList*/
    //authorsList.innerHTML = allAuthors.join(' ');
    console.log(allAuthors);

    /*[DONE] add new const authorsParams*/

    const authorsParams = calculateAuthorsParams(allAuthors);
    console.log('authorsParams', authorsParams);

    /*[DONE] create variable for all links HTML code*/
    //let allAuthorsHTML = '';

    const allAuthorsData = {authors: []};

    /*[DONE] START LOOP: for each author in allAuthors:*/

    for(let articleAuthor in allAuthors){

      /*[DONE] generate code of a link and add it to allAuthorsHTML*/
      //allAuthorsHTML += '<li><a href="#author-' + articleAuthor + '" class="' + calculateAuthorsClass(allAuthors[articleAuthor], authorsParams) + '"> ' + articleAuthor + '</a></li>';

      allAuthorsData.authors.push({
        articleAuthor: articleAuthor,
        count: allAuthors[articleAuthor],
        className: calculateAuthorsClass(allAuthors[articleAuthor], authorsParams)
      });

      /*[DONE] END LOOP: for each author in allAuthors:*/
    }

    /*[DONE] add HTML from allAuthorsHTML to authorList*/
    authorsList.innerHTML = templates.authorCloudLink(allAuthorsData);
    console.log('allAuthorsData', allAuthorsData);

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
