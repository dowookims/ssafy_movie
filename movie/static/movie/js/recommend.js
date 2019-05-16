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
      }]
    }
  },
  methods: {
    prevPage:function(){
      console.log('work well left')
    },
    nextPage: function(){
      console.log('work well right')
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
  <i @click="prevPage" class="fas fa-chevron-left arrow left-arrow2"></i>
    <div class="recommend-mv-list">
      <div class="rc-mv-item" v-for="mv in recommendMovies">
        <div class="recMvImg">
          <img class="recMvImage":src="w500_url+mv.backdrop_path" />
        </div>
        <div class="recMvSub">
        <p>{{mv.title}}</p>
        </div>
      </div>
      <i @click="nextPage"class="fas fa-chevron-right arrow right-arrow2"></i>
    </div>
  </div>
  `
})