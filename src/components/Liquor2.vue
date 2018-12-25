<template>
    <div>
      <br>
      
      <h3 style="padding-left:16px;">Filter By Location</h3>
      <tree
      :data="facetData"
      :options="treeOptions"
    />
    </div>
    
 
</template>

<script>
  export default {
    props: ['facetData'],
    data: function() {
        return {
          //treeData: getTreeData(),
          treeOptions: {
          	checkbox: true,
            deletion(node) {
            	return node.checked()
            }
          }
        }
      },
      methods: {
      	getData() {
        	return Promise.resolve([
            { text: 'Item 1' },
            { text: 'Item 2', state: { expanded: true }, children: [
            	{ text: 'Item 2.1' },
              { text: 'Item 2.2' },
              { text: 'Item 2.3' }
            ]},
            { text: 'Item 3', state: { selected: true } },
            { text: 'Item 4' }
          ])
        },
      
      	onNodeSelected(node) {
        	console.log(node.text)
        }
      }
  }
// function getTreeData() {
//     	return [
//           {
//             text: 'All Categories',

//             // it makes node expanded
//             state: { expanded: false },
//             children: [
//               { text: 'Development', children: [
//                 { text: 'Web', state: { expanded: false }, children: [
//                   { text: 'Frontend' , state: { checked: false }},
//                   { text: 'Backend', state: { checked: false }},
//                   { text: 'Fullstack', state: { checked: false }},
//                   { text: 'Others', state: { checked: false }}
//                 ]},
//                 { text: 'Mobile', children: [
//                   { text: 'Native', state: { checked: false } },
//                   { text: 'Cross-Platform', state: { checked: false } }
//                 ]}
//               ]},
//               { text: 'Infrastructure', children: [
//                   { text: 'ERP', state: { checked: false } },
//                   { text: 'Admin', state: { checked: false } },
//                   { text: 'Others', state: { checked: false }}
//               ]},
//               { text: 'Data Science', children: [
//                 { text: 'Business Intelligence', state: { checked: false } },
//                 { text: 'Big Data', state: { checked: false } },
//                 { text: 'Machine Learning', state: { checked: false } },
//                 { text: 'Others', state: { checked: false }}
//               ]}
//             ]
//           },
//           // {
//           //   text: 'JS: The Wrong Way',

//           //   // it makes node expanded
//           //   state: { expanded: false },
//           //   children: [
//           //     { text: 'Getting Started', state: { checked: false } },
//           //     { text: 'JavaScript Code Style', state: { selected: true } },
//           //     { text: 'The Good Parts', children: [
//           //       { text: 'OBJECT ORIENTED', state: { checked: false }  },
//           //       { text: 'ANONYMOUS FUNCTIONS', state: { checked: false }  },
//           //       { text: 'FUNCTIONS AS FIRST-CLASS OBJECTS', state: { checked: false }  },
//           //       { text: 'LOOSE TYPING', state: { checked: false }  }
//           //     ]},
//           //     { text: 'Patterns', children: [
//           //       { text: 'DESIGN PATTERNS', state: { expanded: true }, children: [
//           //         { text: 'Creational Design Patterns', children: [
//           //           { text: 'Factory' },
//           //           { text: 'Prototype' },
//           //           { text: 'Mixin' },
//           //           { text: 'Singleton' }
//           //         ]},
//           //         { text: 'Structural Design Patterns'}
//           //       ]},
//           //       { text: 'MV* PATTERNS', cildren: [
//           //         { text: 'MVC Pattern' },
//           //         { text: 'MVP Pattern' },
//           //         { text: 'MVVM Pattern' }
//           //       ]}
//           //     ]}
//           //   ]
//           // }
//         ]}

    
</script>