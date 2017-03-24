<template>
        <table class="keyboard table" @click="click">
            <tr is="rw" v-for="row in symbols" :row="row">
            <tr is="rw"  :row="system">
            </tr>
        </table>
</template>

<script>
    var settings = require("./settings")
    module.exports = {
        data: function () {
            return {
                cx: 0,
                cy: 0,
                inRow: false,
                symbols: ['йцукенгшщзхъё', 'фывапролджэ', ' ячсмитьбю', '1234567890'].map((el) => { return el.split(''); }),
                system:['<-','<=','##']
            }
        },
        components: {
            rw: require('./row')        },
        methods: {
            mark: function () {
                if (this.inRow) {

                    this.$children[this.cy].$children[this.cx].mark();
                    return;
                }
                this.$children[this.cy].mark();
            },
            dismark: function () {
                if (this.inRow) {

                    this.$children[this.cy].$children[this.cx].dismark();
                    return;
                }
                if (this.$children[this.cy] !== undefined) this.$children[this.cy].dismark();
            },
            tick: function () {
                this.dismark();
                if (this.inRow) {
                    this.cx++;
                    if (this.cx === this.$children[this.cy].$children.length) {
                        this.cx = 0;
                    }
                } else {
                    this.cy++;
                    if (this.cy === this.$children.length) {
                        this.cy = 0;
                    }
                }

                this.mark();
            },
            click: function () {
                if (this.inRow) {
                    this.$events.emit('input', this.$children[this.cy].$children[this.cx].content)
                    this.reset();
                    return;
                }
                this.dismark();
                this.inRow = true;


            },
            reset: function () {
                this.dismark();
                this.inRow = false;
                this.cx = 0;
                this.cy = -1;

            }
        },
        mounted() {
            this.$events.on('setLoaded', (set)=>{
                this.symbols = set;
            })

            this.mark();
            window.onkeyup = (e) => {
                if (e.target !== document.body) return;
                if (e.keyCode === 32) this.click();
            };
            var scheculd = () => {
                setTimeout(() => {
                    scheculd();
                    if (settings.store.timeout == 0 || !settings.store.work) return this.reset();
                    this.tick();
                }, (settings.store.timeout || 1) * 1000);
            };
            scheculd();
        }
    }

</script>
<style>
    .keyboard {
        width: 100%;
        height: 100%;
    }
    
    .marked {
        background: black;
        color: white;
    }
</style>