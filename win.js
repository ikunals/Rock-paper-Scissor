
const rulesBtn = document.querySelector('.rulesBtn');
const closeBtn = document.querySelector('.inner-btn-div')
const showRules = document.querySelector('.outer-rule-box')

rulesBtn.addEventListener('click',()=>{
    showRules.classList.toggle('hidden');
})
closeBtn.addEventListener('click',()=>{
    showRules.classList.toggle('hidden');
})