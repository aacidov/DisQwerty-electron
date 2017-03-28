<template>
    <td class="button" :class="{success: marked}" @contextmenu.prevent="contextClick">
        <h3>{{title}}</h3>
        <img v-if="src" :src="src" alt="" class="btn-image">
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
                out: '',
                src: null
            }
        },
        props: ['row', 'content', 'index', "system", "rowOut"],
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
                this.src = "";

                this.out = this.content;
                if (this.out.indexOf('%"') > -1) {
                    this.src = this.out.match(/%\"(.*)"/)[1];
                    this.out = this.out.replace(/%\".*\"/, "")
                }
                this.title = this.out;

                if (this.out.indexOf(':=') > -1) {
                    var tmp = this.out.split(':=');
                    this.out = tmp[0];
                    this.title = tmp[1];
                }


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
            this.makeTitle();
            const menu = this.menu = new Menu()
            if (this.rowOut) {
                menu.append(new MenuItem({
                    label: 'Добавить строку', click: () => {

                        this.$events.emit("addRow", this.row);
                    }
                }));
                menu.append(new MenuItem({
                    label: 'Добавить кнопку', click: () => {
                        Dialogs.prompt("Введите содержание:", (content) => {
                            if (content === undefined) return;

                            this.$events.emit("addBtn", { row: this.row, content });
                        });

                    }
                }));
                menu.append(new MenuItem({
                    label: 'Удалить строку', click: () => {

                        Dialogs.confirm(`Удалить строку`, res => {
                            if (!res) return;
                            this.$events.emit("removeRow", this.row);
                        })
                    }
                }))
            } else {
                menu.append(new MenuItem({
                    label: 'Переименовать', click: () => {
                        Dialogs.prompt("Введите новое содержание:", this.content, (title) => {
                            if (title === undefined) return;
                            //    this.content = title;
                            this.$events.emit("rename", { title, coords: [this.row, this.index] })
                        })
                    }
                }))
                menu.append(new MenuItem({
                    label: 'Добавить картинку', click: () => {
                            this.$events.emit("addImage", { coords: [this.row, this.index] })
                        
                    }
                }))
                menu.append(new MenuItem({
                    label: 'Удалить', click: () => {

                        Dialogs.confirm(`Удалить "${this.out}"`, res => {
                            if (!res) return;
                            this.$events.emit("remove", { coords: [this.row, this.index] })
                        })
                    }
                }))
            }
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
    
    .btn-image {
        height: 10vh;
    }
</style>