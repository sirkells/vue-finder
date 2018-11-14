<template>
  <home-cmp></home-cmp>
</template>

<script>
  import Filter from "@/components/SideFilter";
  import Home from "@/components/Home";
  import Cockpit from "@/components/Cockpit";
  
  export default {
    
    components: {
      'filters-cmp': Filter,
      'home-cmp': Home,
      'cock-cmp': Cockpit
    },
    
    data: () => ({
      drawer: false,
      section: '',
      name: 'Filte',
      cockpit:[
            {
              title:"ABCN",
          
              productId:1,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",


            },
            {
              title:"BAFF",
            
              productId:2,
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        
        
            },

            ]
      
    }),
    methods: {
      refresh() {
        this.section = 'home'
      }
    },
    props: {
      source: String
    }
  }
</script>