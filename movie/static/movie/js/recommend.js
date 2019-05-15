Vue.component('recommends', {
  props: ['rcmv'],
  data: function(){
    return {
      origin_url: "https://image.tmdb.org/t/p/original",
      w500_url: "https://image.tmdb.org/t/p/w500",
    }
  },
  mounted: function(){
    this.mv = this.rcmv
  },

  template: `
  <div class="recommend-list">
    <div class="recommend-mv-list>
      <div v-for="movie in rcmv">
        <div class="recMvImg">
          <img :src="w500_url+movie.backdrop_path" />
        </div>
        <div class="recMvSub">
        <p>{{movie.title}}</p>
        </div>
      </div>
    </div>
  </div>
  `
})