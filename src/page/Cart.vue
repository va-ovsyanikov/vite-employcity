<template>
  <div class="m-20 border border-gray-300">
    <div class="cart_item">
      <table class="centered">
        <thead class="border-b-0 bg-gray-600">
          <tr class="text-center text-white   text-lg ">
            <th class="rounded-none">Наименование товара и описание</th>
            <th class="rounded-none">Количество</th>
            <th class="rounded-none">Цена</th>
            <th class="rounded-none"></th>
          </tr>
        </thead>

        <tbody v-if="GET_CART.length">
          <tr v-for="(item, index) in GET_CART" :key="index">
            <td>{{ item.name }}</td>
            <td class="flex justify-center items-center">
              <a class="waves-light #0091ea light-blue accent-4 btn mr-10" @click="decrementCartItem(index)">
                <i class="material-icons">remove</i></a
              >
              <span>{{ item.quantity }}</span>
                 <a class="waves-light #0091ea light-blue accent-4 btn ml-10" @click="incrementCartItem(index)">
              <i class="material-icons">add</i></a
            >
            </td>
         
            <td>{{ item.quantity * item.price }} &#8381;</td>
            <td>
              <a class="waves-light red btn normal-case " @click="removeCart(item.id)">
                 <i class="material-icons left">delete</i>Удалить</a
              >
             
            </td>
          </tr>
          <tr class="border-b-0">
            <td class="px-2 py-10">Итого:</td>
            <td>{{cartTotalQuantity}}</td>
            <td class="font-bold">{{ cartTotalPrice }} &#8381;</td>
          </tr>
        </tbody>
        <tbody v-else>
          <div class="px-2 py-10 text-center">Корзина пустая </div>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Cart',
  computed: {
    ...mapGetters(['GET_CART']),
    cartTotalPrice() {
      return this.GET_CART.reduce(
        (res, item) => res + item.price * item.quantity,
        0
      )
    },
       cartTotalQuantity() {
      return this.GET_CART.reduce(
        (res, item) => res + item.quantity,
        0
      )
    },
  },
  methods: {
    ...mapMutations(['REMOVE_CART', 'INCREMENT_CART_ITEM', 'DECREMENT_CART_ITEM']),
    removeCart(id) {
      this.REMOVE_CART(id)
      this.$emit('forceRerender')
    },
    incrementCartItem(index) {
      this.INCREMENT_CART_ITEM(index)

    },
    decrementCartItem(index) {
      this.DECREMENT_CART_ITEM(index)
    },
  },
}
</script>

<style></style>
