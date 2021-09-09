const foodContainer = document.getElementById('food-container');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const error = document.getElementById('error');
const loading = document.getElementById('loading');

const searchFood = (keyword) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.meals))
}

const searchByCategory = (category) => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.meals))
}



const displayData = data => {
    const foodArr = data;
    try {
        foodArr.forEach(food => {
            const { strMeal, strMealThumb, idMeal } = food;
            // console.log(strMeal, strMealThumb)
            const div = document.createElement('div');
            div.classList.add('col')
            // setLocalStorage(strMeal, strMealThumb)
            div.innerHTML = `
                <div class="card h-100 shadow">
                    <div class="p-2 rounded-3">
                        <img src="${strMealThumb}" class="card-img-top rounded-3" alt="...">
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">${strMeal}</h5>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showDetail(${idMeal})">Detail</button>
                        
                        <button class="btn btn-outline-success" onclick="cartBtnHandler('${strMeal}', '${strMealThumb}')">Add to Cart</button>

                    </div>
                </div>
            `
            foodContainer.appendChild(div);
        })
        toggleLoading(false)
    } catch (error) {
        // console.log(error)
        handleError(`Nothing Found with the name you're looking for`, true)
        toggleLoading(false)
    }

}


const showDetail = idMeal => {
    const details = document.getElementById('details');
    const intID = parseInt(idMeal)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${intID}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const { strMeal, strArea, strMealThumb, strYoutube } = data.meals[0]
            details.innerHTML = `
                <div class="col">
                    <div class="card">
                        <img src="${strMealThumb}" class="card-img-top" alt="..." height="350">
                        <div class="card-body">
                          <h5 class="card-title">${strMeal}</h5>
                          <h5>Origin: ${strArea}</h5>
                        </div>
                        <div class="card-footer">
                            <a href="${strYoutube}" class="btn btn-outline-success">Youtube</a>
                        </div>
                    </div>
                </div>
            `
        })
}



const getFromStorage = () => {
    const cart = localStorage.getItem('cart');
    let cartArr;
    if (cart) {
        cartArr = JSON.parse(cart)
    } else {
        cartArr = []
    }
    return cartArr
}

const setLocalStorage = (strMeal, strMealThumb) => {
    const cartArr = getFromStorage();
    let isDuplicate = 0;
    for (item of cartArr) {
        if (item['name'].toLowerCase() === strMeal.toLowerCase()) {
            item['quantity'] += 1;
            isDuplicate = 1;
        }
    }
    if (!isDuplicate) {
        const cartObj = {};
        cartObj['name'] = strMeal;
        cartObj['img'] = strMealThumb;
        cartObj['quantity'] = 1;
        cartArr.push(cartObj)
    }

    const strCart = JSON.stringify(cartArr)
    localStorage.setItem('cart', strCart)
}

const addToCart = () => {
    const items = getFromStorage();
    cartItems.textContent = '';
    items.forEach(e => {
        const div = document.createElement('div');
        div.classList.add('col', 'd-flex', 'flex-row', 'align-items-center', 'justify-content-between', 'border', 'border-success', 'p-2', 'mb-2');
        div.innerHTML = `
            <img src="${e.img}" width="50" height="50" class="rounded-circle mr-2">
            <h6 class="mr-2">${e.name}</h6>
            <p>Quantity: ${e.quantity}</p>
        `
        cartItems.appendChild(div)
    })
}

const updateCartCount = () => {
    const cart = getFromStorage();
    const size = cart.length;
    cartCount.innerText = size;
}

const cartBtnHandler = (strMeal, strMealThumb) => {
    setLocalStorage(strMeal, strMealThumb);
    addToCart()
    updateCartCount()
}







const handleError = (msg = '', toShow) => {
    if (toShow) {
        error.classList.remove('d-none')
        error.innerText = msg;
    } else {
        error.classList.add('d-none');
    }
}

const toggleLoading = (toShow) => {
    if (toShow) {
        loading.classList.remove('d-none')
    } else {
        loading.classList.add('d-none')
    }
}



// initially showing data 
searchFood('chicken')

// showing data according to search result 
document.getElementById('search-btn').addEventListener('click', (e) => {
    e.preventDefault()
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    if (!searchText) {
        handleError("Please type a food a name first", true);
    } else {
        toggleLoading(true)
        handleError(false)
        // clearing searchField
        searchField.value = '';

        // clearing previous data 
        foodContainer.textContent = '';

        searchFood(searchText)
    }
})


// showing data by category
const categoryList = document.getElementById('category-list');
categoryList.addEventListener('click', (e) => {
    toggleLoading(true)
    const category = e.target.innerText;
    foodContainer.textContent = '';
    searchByCategory(category);
})


// showing previously added cart items 
addToCart()


// clearing cart 
document.getElementById('checkout-btn').addEventListener('click', () => {
    localStorage.removeItem('cart');
    cartItems.textContent = '';
})



























// setTimeout(() => {
//     const decision = confirm("Do you want to buy this?");
//     if (decision) {

//         const amount = prompt("Please add the amount.");
//         const result = parseInt(amount) + 200;


//         setTimeout(() => alert(`Total after adding additional 200: ${result}`), 2000)
//     }

// }, 5000)









// fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
//         .then(res => res.json())
//         .then(data => {
//             const categories = data.categories
//             categories.forEach(e => {
//                 console.log(e.strCategory)
//             })
//             // console.log(categories)
//         })