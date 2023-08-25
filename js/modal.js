
const modalElement = document.querySelector('.modal-container');
const toggleModalVisibility = () => modalElement.classList.toggle('active');

modalElement.addEventListener('click', (e) => {
    if(e.target === modalElement || e.target.classList.contains('modal__close-button')) 
    toggleModalVisibility();
})

const rulesElement = document.querySelector('.rules');
rulesElement.addEventListener('click', toggleModalVisibility);