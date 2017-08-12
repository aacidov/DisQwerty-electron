<template>
    <div class="form-group">
        <h4>Подключение DisButton</h4>
        <button type="button" class="btn btn-default" :class="{'btn-success':work}" @click="(work?stopServer:startServer)()">Запуск сервера</button>
        <button type="button"  class="btn btn-default" disabled v-if="work">{{ip}}</button>
    </div>
</template>

<script>
    var server = require('../server')
    module.exports = {
        data: function () {
            return {
                ip: "Адрес сервера",
                work: false
            }
        },
        methods: {
            startServer() {
                server.start((e) => {
                    if(e) return this.$events.emit('error', e)
                    this.work = true;

                });
            },
            stopServer() {
                server.stop((e) => {
                    if(e) return this.$events.emit('error', e)
                    this.work = false;

                });
            }
        },
        mounted() {
            server.onclick = () => {
                this.$events.emit('click');
            };
            this.ip = server.getIP();
        }
    };

</script>