<template>
<div>
        <table class="keyboard table" @click="click">
            <tr v-if="settings.showSystems.on&&!settings.oneLine.on" is="rw"   :row="system" :system='true'>
                </table>
        <table class="keyboard table" @click="click">
                
            <tr is="rw" v-if="settings.predict.on" :predict='true' :row='[]' ></tr>
        </table>
        <table class="keyboard table" @click="click">             
            <tr is="rw" v-if="settings.oneLine.on" :row="symbols[0]" >

            <tr is="rw" v-else v-for="(row, index) in symbols" :row.sync="row" :rindex.sync="index">
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
                get inRow(){
                    return this.settings.oneLine.on||this._inRow;
                },
                set inRow (v){
                    this._inRow = v;
                },
                _inRow: false,
                symbols: [[]],
                settings: settings.store
            }
        },
        computed: {
            system(){
                if (settings.store.vk.token!=null) return ['<-','<=','##', '@@', 'vkpublish:=vk'];
                else ['<-','<=','##', '@@'];

            }
        },
        components: {
            rw: require('./row'),
            predict: require('./predict')       
         },
        methods: {
            mark: function () {
                if (this.inRow) {

                    this.$children[this.cy].$children[this.cx].mark();
                    return;
                }
                if (this.$children[this.cy] !== undefined) this.$children[this.cy].mark();
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
                    this.$events.emit('input', this.$children[this.cy].$children[this.cx].out)
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
                this.cy = 0;

            }
        },
        mounted() {
            this.$events.on('setLoaded', (set)=>{
                this.symbols = set;
                this.reset();
            })
            this.$events.on('reset', this.reset);
            this.$events.on('click', this.click);

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
    }
    
    .marked {
        background: black;
        color: white;
    }
</style>