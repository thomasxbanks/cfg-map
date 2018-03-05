"use strict";

window.onload = () => {
  console.log('browser js loaded');
  getBrowserDimensions();
  let masthead = document.getElementById('masthead');
  let mastheadHeight = getComputedHeight(masthead);
  document.querySelectorAll('.sidebar').forEach((sidebar)=>{
    sidebar.style.top = mastheadHeight;
    sidebar.style.height = `calc(100vh - ${mastheadHeight})`;
  });
  document.querySelector('main').style.height = `calc(100vh - ${mastheadHeight})`;

  const changeChevronDirection = (element, direction) => {
    element.innerText = `chevron_${direction}`;
  };

  const closeSidebar = (element) =>{
    element.setAttribute('data-state', 'not-active');
  };

  const openSidebar = (element) =>{
    element.setAttribute('data-state', 'is-active');
  };

  document.querySelectorAll('.js-toggle-sidebar').forEach((toggleSidebar)=>{
    toggleSidebar.addEventListener('click', (e)=>{
      let target = document.querySelector(`.${e.currentTarget.getAttribute('data-target')}`);
      let currentState = target.getAttribute('data-state');
      if (currentState === 'is-active') {
        closeSidebar(target);
        changeChevronDirection(e.currentTarget, 'right');
      } else {
        openSidebar(target);
        changeChevronDirection(e.currentTarget, 'left');
      }
    });
  });

  document.querySelector('.searchbar button').addEventListener('click', (e)=>{
    e.preventDefault();
    if (e.currentTarget.parentElement.getAttribute('data-state') === 'open') {
      e.currentTarget.parentElement.submit();
    } else {
      e.currentTarget.parentElement.setAttribute('data-state', 'open');
    }
  });

  document.querySelectorAll('.sidebar-right .data-table .button-tertiary').forEach((demographicButton)=>{
    demographicButton.addEventListener('click', (e)=>{
      e.currentTarget.parentElement.querySelectorAll('.button-tertiary').forEach((demoButton)=>{
        demoButton.setAttribute('data-state', 'not-active');
      });
      e.currentTarget.setAttribute('data-state', 'is-active');
    });
  });

  // console.log(browser.width, browser.height, screen.width, screen.height);
};

window.onresize = () => {
  getBrowserDimensions();
  // console.log(browser.width, browser.height, screen.width, screen.height);
};
