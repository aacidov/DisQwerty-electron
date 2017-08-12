<template>

</template>

<script>
var Dialogs = require('../dialogs');
    module.exports = {
        mounted(){
            this.$events.listen('error', function(e){
                console.error(e)
                var message = "Произошла неизвестная ошибка, попробуйте перезапустить программу";

                Dialogs.alert(message); 
            })
        }
    }

</script>