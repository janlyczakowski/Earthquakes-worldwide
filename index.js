const toggle_btn = document.querySelector('.nav_toggle');
const navigation = document.querySelector('.nav');
const nav_link = document.querySelectorAll('.nav_link');
const nav_link_home = document.querySelector('#nav_link_home');
const portfolio_item = document.querySelectorAll('.portfolio_item');
const generic_category_btn = document.querySelectorAll('.generic_category');
const category_btn = document.querySelectorAll('.category');
const category_tech_btn = document.querySelectorAll('.category_tech');
const portfolio_img = document.querySelectorAll('.portfolio_img');
const single_portfolio_img = document.querySelector('.portfolio_img');
const portfolio_item_cover_text = document.querySelectorAll('.portfolio_item_cover_text');

toggle_btn.addEventListener('click',()=>{
  document.body.classList.toggle('open_nav');
})

nav_link.forEach(link=>{
  link.addEventListener('click',()=>{
    document.body.classList.remove('open_nav');
  })
})

let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});

//************* Filtering portfolio items based on category**********//

// A bit more work because pseudoelements ::after are not part of DOM
// So there have been created new styles insted of modyfing ::after classes 

function deleteTransition(){
  let no_transition = document.head.appendChild(document.createElement('style'));
  no_transition.innerHTML =
  `.generic_category::after,
  .category::after{
    transition: none;
  }`
}
function retrieveTransition(){
  let no_transition = document.head.appendChild(document.createElement('style'));
  no_transition.innerHTML =
  `.generic_category::after,
  .category::after{
    transition: width 250ms ease-in-out;
  }`
}
function deleteWidth(){
  let styleElement = document.head.appendChild(document.createElement('style'));
  styleElement.innerHTML =
   `.generic_category:hover::after,
    .category:hover::after{
    width:0;
    }`
}
function retrieveWidth(){
  let styleElement = document.head.appendChild(document.createElement('style'));
  styleElement.innerHTML =
  `.generic_category:hover::after,
  .category:hover::after{
    width:100%;
  } `
}

let blockIsDisplayed = false;
let techBtnIsActive = false;
let currentTechTargetData = 'all';
let currentGenTargetData = 'all';
// Filter by categories
category_btn.forEach(btn =>{
  btn.addEventListener('click',function(){
    if (btn.classList.contains('category_tech')){
      techBtnIsActive = true;
      currentTechTargetData = btn.getAttribute('data-filter');
     }else{
      currentGenTargetData = btn.getAttribute('data-filter');
     }
    deleteTransition();
    deleteWidth();
    console.log(btn.classList.contains('generic_category'));
    console.log(btn.classList.contains('category_tech'));
    if(btn.classList.contains('generic_category')){
      for(let button of generic_category_btn){
        console.log(button.innerHTML);
        button.classList.remove('active');
      };
      btn.classList.add('active');
    }else{
      for(let button of category_tech_btn){
        console.log(button.innerHTML);
        button.classList.remove('active');
      };
      btn.classList.add('active');
    }

    // show portfolio item
    portfolio_item.forEach(item =>{
      let dataAtt = item.getAttribute("data-spec").split(" ");
      let dataAtt_gen =item.getAttribute("data-gen");
      item.style.display = 'none';
      
      if(dataAtt_gen === currentGenTargetData || currentGenTargetData==="all"){
                item.style.display = "block";
                blockIsDisplayed = true;  
              }
      if(techBtnIsActive && blockIsDisplayed){
        blockIsDisplayed = false;
        dataAtt.forEach(attribute =>{
          console.log(attribute);
          item.style.display = 'none';
          if(attribute === currentTechTargetData || blockIsDisplayed ||currentTechTargetData==="all" ){
           item.style.display = "block";
           blockIsDisplayed = true;
         }
        })
        blockIsDisplayed = false;
      }
   });
   
  });
  btn.addEventListener('mouseover', ()=>{
    if(btn.classList.contains('active')){
      deleteWidth();
    }else{
      retrieveTransition();
      retrieveWidth(); 
    }
  });
});

portfolio_img.forEach(img=>{
  img.addEventListener('mouseover',e=>{
    let imageAttribute = img.getAttribute('data-attribute');
      portfolio_item_cover_text.forEach(item=>{
        let textAttribute = item.getAttribute('data-attribute');
        if(imageAttribute=== textAttribute){
          item.classList.add('portfolio_item_cover_text_show');
        }
      })
      });
      img.addEventListener('mouseout',e=>{
        portfolio_item_cover_text.forEach(item=>{
        item.classList.remove('portfolio_item_cover_text_show');
      })
});
});



