const API_URL = 'http://127.0.0.1:8000';
// main app
const app2 = new Vue({
  el: '#comment',
  data: {
    message: "Hello World!!!!",
    movies: [],
    show: false,
    showmovie: {
      'title':'',
      'actor':'',
      'pubDate':'',
      'userRating':''
    },
  },
  delimiters: ['[[', ']]'],
  created: async function(){
    const res = await axios.get(`${API_URL}/movies/list/`)
    res.data.forEach(movie => this.movies.push(movie))
    console.log(res.data)
  },
  methods: {
    showMore: function(movie){
      if(!this.show){
        this.show = !this.show
      }
      else if(this.showmovie.title === movie.title){
        this.show = !this.show
      }

      if(this.show){
        this.showmovie=movie
        const regActor = this.showmovie.actor.split('|')
        console.log(regActor)
        let actors = ''
        regActor.forEach((name, idx) =>
        { if(regActor.length-2  > idx)
          actors+=`${name}, `
          else
          actors+=name
        })
        this.showmovie.actor = actors
      } else{
        this.showmovie=''
      }
    }
  }
});