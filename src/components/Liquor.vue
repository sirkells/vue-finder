<template>
  
    <tree
      :data="treeData"
      :options="treeOptions"
    />
 
</template>

<script>
  export default {
    data: function() {
        return {
          treeData: getTreeData(),
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
function getTreeData() {
    	return [
          {
            text: 'JS: The Right Way',

            // it makes node expanded
            state: { expanded: true },
            children: [
              { text: 'Getting Started', state: { checked: true } },
              { text: 'JavaScript Code Style', state: { selected: true } },
              { text: 'The Good Parts', children: [
                { text: 'OBJECT ORIENTED', state: { checked: true }  },
                { text: 'ANONYMOUS FUNCTIONS', state: { checked: true }  },
                { text: 'FUNCTIONS AS FIRST-CLASS OBJECTS', state: { checked: true }  },
                { text: 'LOOSE TYPING', state: { checked: true }  }
              ]},
              { text: 'Patterns', children: [
                { text: 'DESIGN PATTERNS', state: { expanded: true }, children: [
                  { text: 'Creational Design Patterns', children: [
                    { text: 'Factory' },
                    { text: 'Prototype' },
                    { text: 'Mixin' },
                    { text: 'Singleton' }
                  ]},
                  { text: 'Structural Design Patterns'}
                ]},
                { text: 'MV* PATTERNS', cildren: [
                  { text: 'MVC Pattern' },
                  { text: 'MVP Pattern' },
                  { text: 'MVVM Pattern' }
                ]}
              ]}
            ]
          },
          {
            text: 'JS: The Wrong Way',

            // it makes node expanded
            state: { expanded: true },
            children: [
              { text: 'Getting Started', state: { checked: true } },
              { text: 'JavaScript Code Style', state: { selected: true } },
              { text: 'The Good Parts', children: [
                { text: 'OBJECT ORIENTED', state: { checked: true }  },
                { text: 'ANONYMOUS FUNCTIONS', state: { checked: true }  },
                { text: 'FUNCTIONS AS FIRST-CLASS OBJECTS', state: { checked: true }  },
                { text: 'LOOSE TYPING', state: { checked: true }  }
              ]},
              { text: 'Patterns', children: [
                { text: 'DESIGN PATTERNS', state: { expanded: true }, children: [
                  { text: 'Creational Design Patterns', children: [
                    { text: 'Factory' },
                    { text: 'Prototype' },
                    { text: 'Mixin' },
                    { text: 'Singleton' }
                  ]},
                  { text: 'Structural Design Patterns'}
                ]},
                { text: 'MV* PATTERNS', cildren: [
                  { text: 'MVC Pattern' },
                  { text: 'MVP Pattern' },
                  { text: 'MVVM Pattern' }
                ]}
              ]}
            ]
          }
        ]
    }
</script>