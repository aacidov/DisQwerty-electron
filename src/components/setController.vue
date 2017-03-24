<template>
    <div></div>
</template>

<script>
    const fs = require('fs');
    const Path = require('path')
    var jschardet = require("jschardet")
    const {dialog} = require('electron').remote;

    module.exports = {
        data: function () {
            return {
                set: [],
                filename: __dirname + Path.sep + ".."+Path.sep+ "sets" + Path.sep + "ru.dq"
            };
        },
        methods: {
            chooseSetDialog() {
                dialog.showOpenDialog({}, (filenames) => {
                    if (filenames == undefined) return;
                    this.filename = filenames[0];
                    this.loadSet();
                });
            },
            loadSet() {

                fs.readFile(this.filename, (err, raw) => {
                    if (err) return this.$events.emit('error', err);
                    raw = raw.toString(jschardet.detect(raw).encoding);
                    this.set = raw.split('\n').map((line) => { return line.split(';') });
                    this.$events.emit('setLoaded', this.set);
                })
            },
            rename(data) {
                this.set[data.coords[0]][data.coords[1]] = data.title;
                this.$events.emit('setLoaded', this.set);

            }
        },
        mounted() {

            this.loadSet();
            this.$events.on('chooseSetDialog', this.chooseSetDialog)
            this.$events.on('rename', this.rename)
        }
    }

</script>