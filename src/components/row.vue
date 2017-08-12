<template>
    <tr v-if="!predict||row.length>0" class="row" :class="{success: marked, system: predict||system}">
    <td is=btn content="^" row-out="true" :row="rindex" v-if="!oneLine.on"></td>
     <td is="btn"  v-for="(symbol, index) in row" :content.sync="symbol" :index.sync="index" :row.sync="rindex"></td   >
       </tr>
</template>

<script>
    var predict = require('../node/predict')
    var settings = require('./settings').store;
    module.exports={
        props: ['row', 'rindex', 'predict', 'system'],
        data:
            function(){ return{
            marked:false,
            oneLine:settings.oneLine
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
        },
        mounted () {
            if (this.predict) {
                this.$events.on('newContent', (text)=>{
                    predict.complete(text, (err, data)=>{

                        if (err!=null) {
                            return;
                        }
                        settings.predict.data = data;
                        this.row = (data.text).map((word)=>{
                            if (data.pos>-1){
                                if (data.pos>0) word=' '+word;
                                return word;
                            }
                            return word.slice(data.pos*-1)+':='+word;
                        });
                    })
                })
            }
        }
    }
    </script>

    <style scoped>
    .row{
        width: 100%;
        margin: 0;
        left: 0;
        right: 0;
    }
    .system, .row{
        
    }
    </style>
    