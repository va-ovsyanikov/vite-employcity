<template>
  <div class="m-20">
    
    <!-- <div v-for="(item, i) in GET_LIST" :key="i">
      <div>
        {{ GET_DATA[i] }}
        {{item}}
        {{item.G}}

      </div>
    </div> -->
    <div
      class="border border-gray-400 mt-5"
      v-for="item in GET_DATA"
      :key="item.T"
    >
      <div class="text-lg font-bold data_head px-2 py-4 bg-gray-600 text-white" >
        <h3 class="text-red">{{ GET_LIST[item.G].G }}</h3>
      </div>
      <div class="data_body">
        <div
          class="item_wrapp flex justify-between cursor-pointer border-t border-gray-400 hover:bg-gray-300"
        >
          <div
            class="pl-2 py-2 item2 w-11/12"
            @click="
              addCart({
                id: GET_LIST[item.G].B[item.T],
                quantity: 1,
                name: GET_LIST[item.G].B[item.T].N,
                price: Math.round(item.C * 76),
              })
            "
          >
            {{ GET_LIST[item.G].B[item.T].N }} ({{ item.P }})
          </div>

          <div
            class="item font-medium bg-gray-100 flex justify-center items-center"
          >
            {{ Math.round(item.C * 76) }} &#8381;
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters(['GET_DATA', 'GET_LIST']),
    // listData() {
    //   const getData = this.$store.getters.GET_DATA
    //   const getList = this.$store.getters.GET_LIST
    //   for (const d in  getData) {
    //     console.log(d)
    //   }
    //   for (const l in getList) {
    //     console.log(l)
    //   }
    // },
  },
  methods: {
    ...mapActions(['FETCH_DATA', 'FETCH_LIST']),
    ...mapMutations(['ADD_CART']),
    addCart(data) {
      this.ADD_CART(data)
    },
  },
  mounted() {
    this.FETCH_DATA(), this.FETCH_LIST()
  },
}
</script>
<style>
.item2 {
  flex: auto 1 100px;
}
.item {
  flex: 1 1 0;
  width: 20%;
}
.item_wrapp:hover > .item {
  background: #9ca3af;
}
</style>
