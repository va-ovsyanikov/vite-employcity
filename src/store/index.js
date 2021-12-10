import axios from 'axios'
import { createStore } from 'vuex'

const store = createStore({
    state: () => ({
        data: '',
        list: '',
        cart: [],
    }),

    mutations: {
        FETCH_DATA(state, data) {
            state.data = data
        },
        FETCH_LIST(state, list) {
            state.list = list
        },
        ADD_CART(state, product) {
            if (state.cart.length) {
                let isProductExists = false;
                state.cart.map(item => {
                    if (item.id === product.id) {
                        isProductExists = true
                        confirm('Товар уже есть в корзине!')
                    }
                })
                if (!isProductExists) {
                    state.cart.push(product)
                    localStorage.setItem("product", JSON.stringify(state.cart))
                }
            } else {
                state.cart.push(product)
                localStorage.setItem("product", JSON.stringify(state.cart))
            }
        },
        REMOVE_CART(state, id) {
            if (confirm('Хотите удалить продукт?')) {
                state.cart = state.cart.filter(item => item.id !== id)
                localStorage.setItem("product", JSON.stringify(state.cart))
            }

        },
        INCREMENT_CART_ITEM(state, index) {
            state.cart[index].quantity++
            localStorage.setItem("product", JSON.stringify(state.cart))

        },
        DECREMENT_CART_ITEM(state, index) {
            if (state.cart[index].quantity > 1) {
                state.cart[index].quantity--
                localStorage.setItem("product", JSON.stringify(state.cart))
            }
        },
    },



    actions: {
        async FETCH_DATA({ commit }) {
            try {
                const response = await axios.get('http://localhost:3001/data')
                commit("FETCH_DATA", response.data.Value.Goods)
            } catch (error) {
                console.log(error)
            }
        },
        async FETCH_LIST({ commit }) {
            try {
                const response = await axios.get('http://localhost:3002/list')
                commit("FETCH_LIST", response.data)
            } catch (error) {
                console.log(error)
            }
        },
    },


    getters: {
        GET_DATA: state => state.data,
        GET_LIST: state => state.list,
        GET_CART: state => {
            if (JSON.parse(localStorage.getItem("product"))) {
                try {
                    state.cart = JSON.parse(localStorage.getItem("product"));
                    return state.cart
                } catch (e) {
                    localStorage.removeItem("product");
                }
            } else {
                return state.cart
            }
        }
    }
})
export default store
