
// const setAttr = (el, attr) => {
//     for (key in attr) {
//         el.setAttribute(key, attr[key])
//     }
// }

// const createModal = () => {
//     const div = document.createElement('div');
//     div.classList.add('modal', 'fade')
//     const attrs = { "id": "exampleModal", "tabindex": -1, "aria-labelledby": "exampleModalLabel", "aria-hidden": "true" }
//     setAttr(div, attrs);

//     const dialogDiv = document.createElement('div');
//     dialogDiv.classList.add('modal-dialog');

//     const contentDiv = document.createElement('div');
//     contentDiv.classList.add('modal-content');

//     const headerDiv = document.createElement('div');
//     headerDiv.classList.add('modal-header');

//     const modalTitle = document.createElement('h5');
//     modalTitle.classList.add('modal-title');
//     setAttr(modalTitle, { "id": "exampleModalLabel" });
//     modalTitle.innerText = 'Food Details';

//     const closeBtn = document.createElement('button');
//     closeBtn.classList.add('btn-close');
//     setAttr(closeBtn, { "type": "button", "data-bs-dismiss": "modal", "aria-label": "Close" })

//     headerDiv.appendChild(modalTitle)
//     headerDiv.appendChild(closeBtn)


//     const bodyDiv = document.createElement('div');
//     bodyDiv.classList.add('modal-body');

//     const detailDiv = document.createElement('div');
//     setAttr(detailDiv, { "id": "details" })
//     detailDiv.classList.add('row', 'row-cols-1');

//     bodyDiv.appendChild(detailDiv);

//     const footerDiv = document.createElement('div');
//     footerDiv.classList.add('modal-footer')

//     const close = document.createElement('button')
//     close.classList.add('btn', 'btn-secondary');
//     setAttr(close, { "type": "button", "data-bs-dismiss": "modal" })
//     close.innerText = 'Close'

//     const saveBtn = document.createElement('button');
//     saveBtn.classList.add('btn', 'btn-primary')
//     saveBtn.setAttribute('type', 'button')
//     saveBtn.innerText = 'Save'

//     footerDiv.appendChild(close)
//     footerDiv.appendChild(saveBtn)

//     contentDiv.appendChild(headerDiv)
//     contentDiv.appendChild(bodyDiv)
//     contentDiv.appendChild(footerDiv)

//     dialogDiv.appendChild(contentDiv)

//     div.appendChild(dialogDiv)

//     return div;
// }

// const modalDiv = createModal()
// modalContainer.appendChild(modalDiv)




// const setLocalStorage = () => {
//     const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`
//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             const { strMeal, strMealThumb } = data.meals[0]
//             const cart = getFromStorage()
//             console.log(cart)
//             let isDuplicate = 0;
//             for (product of cart) {

//                 if (product['name'].toLowerCase() === strMeal.toLowerCase()) {
//                     product['quantity'] += 1
//                     isDuplicate = 1;
//                 }
//             }
//             if (!isDuplicate) {
//                 const cartObj = {}
//                 cartObj["name"] = strMeal
//                 cartObj["img"] = strMealThumb
//                 cartObj['quantity'] = 1
//                 cart.push(cartObj)
//             }


//             const strCart = JSON.stringify(cart)
//             localStorage.setItem('cart', strCart)
//         })
// }