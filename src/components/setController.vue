
<template>
    <div></div>
</template>

<script>
    const fs = require('fs');

    var jschardet = require("jschardet")
    const {dialog} = require('electron').remote;

    module.exports={
        methods:{
            chooseSetDialog: function  (){
                dialog.showOpenDialog({},  (filenames)=>{
                    if (filenames==undefined) return;
                    fs.readFile(filenames[0], (err, raw)=>{
                        if (err) return this.$events.emit('error', err);
                        raw=raw.toString(jschardet.detect(raw).encoding);
                        var set = raw.split('\n').map((line)=>{return line.split(';')});
                        this.$events.emit('setLoaded', set);
                    })
                });
            }
        },
        mounted(){
            this.$events.on('chooseSetDialog', this.chooseSetDialog)
        }
    }

</script>



