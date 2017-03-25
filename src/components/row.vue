<template>
    <tr class="row" :class="{success: marked}">
    <td is=btn content="^" row-out="true" :row="rindex"></td>
     <td is="btn"  v-for="(symbol, index) in row" :content="symbol" :index="index" :row="rindex"></td   >
       </tr>
</template>

<script>
    module.exports={
        props: ['row', 'rindex'],
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