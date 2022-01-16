function ready(callbackFunc) {
    if (document.readyState !== 'loading') {
        callbackFunc();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', callbackFunc);
    }
}

ready(() => {
    const modalOverlay = document.querySelector('.modal-overlay')
    const cards = document.querySelectorAll('.card')

    for (let card of cards) {
        const currentPage = location.pathname

        if (!cards || currentPage.includes('admin')) {
            return
        }

        card.addEventListener('click', () => {
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
    document.querySelector('.modal-overlay').addEventListener('click', e => {
        let tgt = e.target

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

    const currentPage = location.pathname
    const menuItems = document.querySelectorAll('header .links a')

    for (const item of menuItems) {
        if (currentPage.includes(item.getAttribute('href'))) {
            item.classList.add('active')
        }
    }

    const addNewButtons = document.querySelectorAll('.add-new')

    for (let button of addNewButtons) {
        button.addEventListener('click', e => {
            e.preventDefault()

            const parent = e.target.parentElement
            const inputsContainer = parent.querySelector('.input-list')
            const tipo = inputsContainer.getAttribute('id')

            inputsContainer.innerHTML += `<input type="text" name="${tipo}[]" value="">`
        })
    }

    const photoUpload = document.getElementById('avatar')

    if (photoUpload) {
        photoUpload.addEventListener('change', function(e) {
            const input = e.target
            const fileList = input.files;
            const parent = input.parentElement
            const button = parent.querySelector('p')

            if (fileList.length > 0) {
                button.style.backgroundColor = '#5AE657'
                button.style.color = 'black'
            } else {
                button.style.backgroundColor = '#6558C3'
                button.style.color = 'white'
            }
        })
    }
})