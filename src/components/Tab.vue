<template>
  
 <v-app >
  hello
</v-app>
</template>

<script>
  export default {
    data () {
      return {
        tab: null,
        tab_items: ['web', 'shopping', 'videos', 'images', 'news'],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        dialog: false,
        search_term: '',
        drawer: null,
        dark: false,
        show: false,
        lActive: false,
        gActive: false,
        gtActive: false,
        gtsActive: false,
        skActive: false,
        errored: false,
        loading: true,
        cockpit: [],
        results: [],
        total_results: [],
        panel: [],
        items: 5,
        selected: ['Trevor Handsen'],
        items: ['Kelechi Igbokwe', 'Paul Zimmer', 'Marco Hoher'],
        title: '',
        subject: '',
        section: 'home',
        products:[
      {
        productTitle:"ABCN",
        image       : require('../assets/images/product1.jpeg'),
        productId:1,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",


      },
      
      ]
      }
    },
    created() {
      this.fetchData(this.section)
      this.gtActive = false
      this.gtsActive = false
      this.gActive = false
      this.skActive = false
      
    },

    
    methods: {
      // Create an array the length of our items
      // with all values as true
      toggle(card) {
        if (card === 'skActive') {
          this.skActive = !this.skActive
          this.gtActive = false
          this.gtsActive = false
          this.gActive = false
        }
        else if (card === 'gActive') {
          this.gActive = !this.gActive
          this.skActive = false
          this.gtActive = false
          this.gtsActive = false
        }
        else if (card === 'gtActive') {
          this.gtActive = !this.gtActive
          this.skActive = false
          this.gtsActive = false
          this.gActive = false
        }
        else if (card === 'gtsActive') {
          this.gtsActive = !this.gtsActive
          this.skActive = false
          this.gtActive = false
          this.gActive = false
        }
        
      },
      myFilter: function(index){
            console.log(index)

            if(this.isActive){
              this.isActive = false;
            }
            else{
              this.isActive = true;
            }
          // some code to filter users
        },
        addToCockpit: function(index) {
          this.cockpit.push(this.results[index])
          
          console.log(this.cockpit.length)
          alert('Project has been added')

        },
      reset() {
        this.gtActive = false
        this.gtsActive = false
        this.gActive = false
        this.skActive = false
      },
      all () {
        this.panel = [...Array(this.items).keys()].map(_ => true)
      },
      // Reset the panel
      none () {
        this.panel = []
      },
      saved () {

        alert('Project has been bookmarked')
      },
      addToCockpit: function(index) {
          this.cockpit.push(this.results[index])
          console.log(this.cockpit.length)
          alert('Project has been added')

        },
      appendItems () {
              if (this.results.length < this.total_results.length) {
                  var next_data = this.total_results.slice(this.results.length, this.results.length + 10);
                  this.results = this.results.concat(next_data);
              }
          },
      fetchData(section) {
          axios.get('http://127.0.0.1:5000/'+section)
          .then((resp) => {
            this.total_results = resp.data.project_lists
            this.results = resp.data.project_lists.slice(0, 10)
            console.log(resp)
            
            
          })
          .catch((err) => {
            console.log(err)
            this.errored = true
          })
          .finally(() => this.loading = false)
        },
      },
      
    mounted() {
    // axios
    //   .get("http://127.0.0.1:5000/home")
    //   .then(response => {
    //     this.total_results = response.data.project_lists
    //     this.results = response.data.project_lists.slice(0, 10)
    //     });
    var vueInstance = this;
    var elem = document.getElementById('product-list-bottom');
    var watcher = scrollMonitor.create(elem);
    watcher.enterViewport(function() {
        console.log('hello')
        vueInstance.appendItems()
    })
  },
  }
</script>