<template>
    <h1 class="out"><span >{{content}}</span><span class="cursor">|</span></h1> 
</template>

<script>
    module.exports ={
        data:function(){
            return{
                content:""
            }
        },
        methods:{
            input: function(content){
                switch(content){
                    case "^":

                        break;
                    case "<-":
                        this.backspace();
                    break;
                    case "<=":
                        this.backword();
                    break;
                    case "##":
                        this.clear();
                    break;
                    default:
                        this.content+=content;
                        break;
            }
            },
            clear: function(){
                this.content="";
            },
            backspace: function () {
                this.content = this.content.slice(0, -1);
            },
            backword: function(){
                this.content = this.content.slice(0, this.content.lastIndexOf(" "));
            }
        },
        mounted(){
            this.$events.on('input', this.input);
            this.$events.on('clear', this.clear);
        }
    };
</script>

<style>
    @keyframes blinkin {
    0% {
        color: black;
    }
    50% { 
        color: white;
    }
    100% {
        color: black;
    }
}
    .cursor{
        animation-duration: 1s;
        animation-name: blinkin;

        animation-iteration-count: infinite;
        margin: 0;
    }
    .out{
        border: 1px solid black;
    }
</style>