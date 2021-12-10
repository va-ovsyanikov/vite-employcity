<template>
  <div class="app" >
    <nav class="pl-5 pr-5 #006064 cyan darken-3">
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">Employcity</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><router-link to="/">Главная</router-link></li>
          <li  > 
            <router-link  :key="componentKey"  to="/Cart"
              >Корзина <span class="relative  -top-3 px-2 py-0.5  bg-red-700 text-center rounded-full " >{{GET_CART.length}}</span>
            </router-link >
          </li>
        </ul>
      </div>
    </nav>

    <router-view :key="componentKey"  @forceRerender="forceRerender"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'App',
    data: ()=> ({
        componentKey:0

    }),
  computed: {
    ...mapGetters(['GET_CART'])
  },
  methods: {
    forceRerender() {
      this.componentKey++;  
    }
  },
}
</script>

<style>
nav li:hover,
nav li .router-link-exact-active {
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
</style>
