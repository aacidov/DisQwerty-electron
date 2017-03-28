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
                filename: __dirname + Path.sep + ".." + Path.sep + "sets" + Path.sep + "ru.dq"
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
            saveSetDialog() {
                dialog.showSaveDialog({ defaultPath: this.filename }, (filename) => {
                    if (filename == undefined) return;
                    var string = this.set.map((a) => { return a.join(';') }).join('\n');
                    fs.writeFile(filename, string, (err) => {
                        if (err) return this.$events.emit('error', err);

                    })
                });
            },
            newSetDialog() {
                this.filename = __dirname + Path.sep + ".." + Path.sep + "sets" + Path.sep + "new.dq";
                this.loadSet();
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

            },
            remove(data) {
                this.set[data.coords[0]].splice(data.coords[1], 1);
                if (this.set[data.coords[0]].length === 0) {
                    return this.removeRow(data.coords[0]);
                }
                this.$events.emit('setLoaded', this.set);

            },
            addImage(data){
                dialog.showOpenDialog({}, (filenames)=>{
                    if (filenames==undefined) return;
                    var image = filenames[0];
                    this.set[data.coords[0]][data.coords[1]] += `%"${image}"`;

                });
            },
            removeRow(rindex) {
                this.set.splice(rindex, 1);
                this.$events.emit('setLoaded', this.set);

            },
            addRow(after) {
                this.set.splice(after + 1, 0, []);

                this.$events.emit('setLoaded', this.set);

            },
            addBtn(data) {
                this.set[data.row].push(data.content);
                this.$events.emit('setLoaded', this.set);

            }

        },
        mounted() {

            this.loadSet();
            this.$events.on('chooseSetDialog', this.chooseSetDialog)
            this.$events.on('saveSetDialog', this.saveSetDialog)
            this.$events.on('newSetDialog', this.newSetDialog)
            this.$events.on('rename', this.rename)
            this.$events.on('remove', this.remove)
            this.$events.on('removeRow', this.removeRow)
            this.$events.on('addRow', this.addRow)
            this.$events.on('addBtn', this.addBtn)
            this.$events.on('addImage', this.addImage)
        }
    }

</script>