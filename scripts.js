const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener('click', function() {
        let img = card.querySelector('img').src
        let title = card.querySelector('h4').innerHTML
        let text = card.querySelector('p').innerHTML

        modalOverlay.classList.add('active')
        modalOverlay.querySelector('img').src = img
        modalOverlay.querySelector('h4').innerHTML = title
        modalOverlay.querySelector('p').innerHTML = text
    })
}

document.querySelector('.close-modal').addEventListener('click', closeModal)
document.querySelector('.modal-overlay').addEventListener('click', function(e) {
    let tgt  = e.target

    if (tgt.classList.contains('modal-overlay')) {
        closeModal()
    }    
})

function closeModal() {
    modalOverlay.classList.remove('active')
    modalOverlay.querySelector('img').src = ''
    modalOverlay.querySelector('h4').innerHTML = ''
    modalOverlay.querySelector('p').innerHTML = ''
}