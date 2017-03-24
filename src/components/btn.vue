<template>
    <td class="button" :class="{success: marked}" @contextmenu.prevent="contextClick">
        <h3>{{title}}</h3>
    </td>
</template>
<script>
    const {remote} = require('electron')
    const {Menu, MenuItem} = remote

    var Dialogs = require('../dialogs');
    module.exports = {
        data: function () {
            return {
                marked: false,
                title: '', 
                out: ''
            }
        },
        props: ['row', 'content', 'index'],
        methods: {
            mark() {
                this.marked = true;
            },
            dismark() {
                this.marked = false;
            },
            contextClick() {
                this.menu.popup(remote.getCurrentWindow())
            },
            makeTitle() {
                this.out = this.content;
                if (this.out.indexOf(':=')>-1){
                    var tmp = this.out.split(':=');
                    this.out = tmp[0];
                    this.title = tmp[1];
                    return;
                }

                this.title = this.out;

            }
        },
        watch: {
            title: function (val) {
                return val;
            },
            content: function (val) {
                this.makeTitle();
                
            }
        },

        mounted() {
           this. makeTitle();
            const menu = this.menu = new Menu()
            menu.append(new MenuItem({
                label: 'Переименовать', click: () => {
                    Dialogs.prompt("Введите новое название:", this.content, (title) => {
                        if (title === undefined) return;
                    //    this.content = title;
                        this.$events.emit("rename", { title, coords: [this.row, this.index] })
                    })
                }
            }))
            menu.append(new MenuItem({
                label: 'Удалить', click: () => {

                    Dialogs.confirm(`Удалить "${this.title}"`, res => {
                        if (!res) return;

                    })
                }
            }))
        }
    };

</script>

<style>
    .button {
        border: 1px black solid;
        text-align: center;
        width: auto;
        font-size: 4vh;
        height: 100%;
    }
</style>