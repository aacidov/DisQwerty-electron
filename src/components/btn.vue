<template>
    <td class="button" :class="{success: marked}"><h3>{{content}}</h3></td>
</template>
<script>
    module.exports={
        data:function(){
            return {
                marked:false
            }
        },
        props:['row', 'content'],
        methods:{
            mark(){
                this.marked = true;
            },
            dismark(){
                this.marked = false;
            }
        }
    };
    </script>

    <style>

    .button{
        border: 1px black solid;
        text-align: center;
        width: auto;
        font-size: 4vh;
        height: 100%;
        

    }
    
    </style>