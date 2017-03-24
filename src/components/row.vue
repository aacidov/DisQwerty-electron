<template>
    <tr class="row" :class="{success: marked}">
    <td is=btn content="^"></td>
     <td is="btn"  v-for="symbol in row" :content="symbol"></td   >
       </tr>
</template>

<script>
    module.exports={
        props: ['row'],
        data:
            function(){ return{
            marked:false
            };
            

        },
        components:{
         btn: require('./btn'),   
        },
        methods:{
            mark(){
                this.marked=true;
            },
           dismark(){
                this.marked=false;
            }
        }
    }
    </script>