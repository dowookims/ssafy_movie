Vue.component('recommends', {
  props: ['movieid'],
  data: function(){
    return {
      rendered: false,
      origin_url: "https://image.tmdb.org/t/p/original",
      w500_url: "https://image.tmdb.org/t/p/w500",
      recommendMovies:[{
        title:'',
        backdrop_path:''
      }],
      page: 0
    }
  },
  methods: {
    prevPage:function(){
      if(this.page===0){
        this.page = -600
      }else{
      this.page += 120
      }
    },
    nextPage: function(){
      if(this.page=== -600){
        this.page =0
      }else{
      this.page -= 120
      }
    }
} ,
  mounted: function(){
    console.log('recommand mount')
    axios.get(`https://api.themoviedb.org/3/movie/${this.movieid}/similar?api_key=${API_KEY}&language=ko-KR`)
        .then(res => {
          this.recommendMovies= []
          return(res.data.results)
        })
        .then(data => {
          data.forEach(movie => {
            this.recommendMovies.push(movie)
          })
        })
  },

  template: `
  <div class="recommend-list">
    <i @click="prevPage" class="fas fa-chevron-left arrow rc-left-arrow"></i>
    <div class="recommend-mv-list" :style="{'margin-left': page + '%'}">
      <div class="rc-mv-item" v-for="mv in recommendMovies">
        <div class="recMvImg">
          <img class="recMvImage":src="w500_url+mv.backdrop_path" />
        </div>
        <div class="recMvSub">
        <p>{{mv.title}}</p>
        </div>
      </div>
    </div>
    <i @click="nextPage"class="fas fa-chevron-right arrow rc-right-arrow"></i>  
  </div>
  `
})