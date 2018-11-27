<template>
   
    <v-card>
        <v-card-title>
            My Filter
        </v-card-title>
        <v-card-text>
            <v-treeview :items="items" :open="open" checkbox>
                <template slot="prepend" slot-scope="{item, open}">
                    <v-icon v-if="item.type === 'folder'">
                        {{ open ? 'mdi-folder-open' : 'mdi-folder' }}

                    </v-icon>
                    <v-icon v-else>
                        {{ fileTypes[item.type] }}
                    </v-icon>
                    
                </template>
            </v-treeview>
        </v-card-text>
    </v-card>
            
</template>

<script>
export default {
    data() {
        return {
            items: [
                    {
                        id: 1,
                        name: 'Development',
                        type: 'folder',
                        children: [
                            {
                                id: 4,
                                name: 'Web',
                                type: 'folder',
                                children: [
                                    {
                                        id: 6,
                                        name: 'Backend',
                                        type: 'folder',
                                        children: [
                                            {
                                                id: 6,
                                                name: 'Simple Item 1.1.1',
                                                type: 'js',
                                                
                                            },
                                        ]
                                        
                                    },
                                    {
                                        id: 7,
                                        name: 'Frontend',
                                        type: 'folder',
                                        children: [
                                            {
                                                id: 6,
                                                name: 'Simple Item 1.1.1',
                                                type: 'js',
                                                
                                            },
                                        ]
                                        
                                    },
                                    {
                                        id: 8,
                                        name: 'Fullstack',
                                        type: 'folder',
                                        children: [
                                            {
                                                id: 6,
                                                name: 'Simple Item 1.1.1',
                                                type: 'js',
                                                
                                            },
                                        ]
                                        
                                    },
                                    

                                ]
                            },
                            {
                                id: 5,
                                name: 'Mobile',
                                type: 'folder',
                                children: []
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: 'Infrastructure',
                        type: 'folder',
                        children: [
                            {
                                id: 4,
                                name: 'ERP',
                                type: 'folder',
                                children: [
                                    {
                                        id: 6,
                                        name: 'Simple Item 1.1.1',
                                        type: 'js',
                                        
                                    },
                                    {
                                        id: 7,
                                        name: 'Simple Item 1.1.2',
                                        type: 'png',
                                        
                                    },
                                    {
                                        id: 8,
                                        name: 'Simple Item 1.1.3',
                                        type: 'html',
                                        
                                    },
                                    

                                ]
                            },
                            {
                                id: 5,
                                name: 'Admin',
                                type: 'folder',
                                children: [
                                        {
                                            id: 6,
                                            name: 'Simple Item 1.3',
                                            type: 'js'
                                            
                                        }
                                ]
                            }
                        ]
                    },
                    {
                        id: 3,
                        name: 'Data Science',
                        type: 'folder',
                        children: [
                            {
                                id: 4,
                                name: 'Big Data',
                                type: 'folder',
                                children: [
                                    {
                                        id: 6,
                                        name: 'Hadoop',
                                        type: 'js',
                                        
                                    },
                                    {
                                        id: 7,
                                        name: 'Database',
                                        type: 'png',
                                        
                                    },
                                    {
                                        id: 8,
                                        name: 'Cloud',
                                        type: 'html',
                                        
                                    },
                                    

                                ]
                            },
                            {
                                id: 5,
                                name: 'Machine Learning',
                                type: 'js'
                                
                            },
                            {
                                id: 6,
                                name: 'Business Intelligence',
                                type: 'js',
                                
                            },
                        ]
                    },
                    {
                        id: 4,
                        name: 'Region',
                        type: 'folder',
                        children: [
                                    {
                                        id: 6,
                                        name: 'Hessen',
                                        type: 'js',
                                        
                                    },
                                    {
                                        id: 7,
                                        name: 'Bayern',
                                        type: 'png',
                                        
                                    },
                                    {
                                        id: 8,
                                        name: 'Bremwn',
                                        type: 'html',
                                        
                                    },
                                    

                                ]
                        
                    }
                ],
            
            fileTypes: {
                png: 'mdi-file-image',
                js: 'mdi-nodejs',
                html: 'mdi-language-html5'
            },
            open: []
        }
    },
    
}

</script>

