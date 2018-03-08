"use strict";

window.onload = () => {
  console.log('browser js loaded');
  getBrowserDimensions();
  let masthead = document.getElementById('masthead');
  let mastheadHeight = getComputedHeight(masthead);
  var sidebars = [].slice.call(document.querySelectorAll('.sidebar'));
  sidebars.forEach((sidebar)=>{
    sidebar.style.top = mastheadHeight;
    sidebar.style.height = `calc(100vh - ${mastheadHeight})`;
  });
  document.querySelector('main').style.height = `calc(100vh - ${mastheadHeight})`;
  document.querySelector('main').style.paddingTop = `${mastheadHeight}`;
  document.querySelector('#map').style.height = `calc(100vh - ${mastheadHeight})`;

  const changeChevronDirection = (element, direction) => {
    element.innerText = `chevron_${direction}`;
  };

  const closeSidebar = (element) =>{
    element.setAttribute('data-state', 'not-active');
  };

  const openSidebar = (element) =>{
    element.setAttribute('data-state', 'is-active');
  };
  var sidebarToggles = [].slice.call(document.querySelectorAll('.js-toggle-sidebar'));
  sidebarToggles.forEach((toggleSidebar)=>{
    toggleSidebar.addEventListener('click', (e)=>{
      let target = document.querySelector(`.${e.currentTarget.getAttribute('data-target')}`);
      let currentState = target.getAttribute('data-state');
      sidebars.forEach((sidebar)=>{
        closeSidebar(sidebar);
        changeChevronDirection(sidebar.querySelector('button'), 'right');
      });
      if (currentState === 'is-active') {
        closeSidebar(target);
        changeChevronDirection(e.currentTarget, 'right');
      } else {
        openSidebar(target);
        changeChevronDirection(e.currentTarget, 'left');
      }
    });
  });

  // document.querySelector('.searchbar button').addEventListener('click', (e)=>{
  //   e.preventDefault();
  //   let form = e.currentTarget.parentElement;
  //   if (form.getAttribute('data-state') === 'open') {
  //     form.submit();
  //   } else {
  //     form.setAttribute('data-state', 'open');
  //     form.querySelector('input').focus();
  //   }
  // });

  // console.log(browser.width, browser.height, screen.width, screen.height);
};

window.onresize = () => {
  getBrowserDimensions();
  // console.log(browser.width, browser.height, screen.width, screen.height);
};
