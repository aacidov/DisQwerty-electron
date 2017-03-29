<template>
    <div class="form-group">
        <h4>Настройки синтезатора голоса.</h4>
        <button type="button" class="btn btn-default" @click="say('Проверяем голос')">Проверка</button>
        <button type="button" class="btn btn-default" :class="{'btn-success':online}" @click="online=!online">Онлайн озвучка текста</button>
        <select class="btn" v-model="voice" v-if="online">
    <option value="zahar">Захар</option>
    <option value="ermil">Емиль</option>
    <option value="jane">Джейн</option>
    <option value="omazh">Ома</option>
  </select>
    </div>
</template>
<script>
    var say = require('say');
    var wtts = require('wintts');

    module.exports = {
        data: function () {
            return {
                online: false, voice: "zahar"
            };
        },
        methods: {
            say(text) {
                if (this.online) {
                    this.yatts.speak(
                        text,
                        {
                            speaker: this.voice,
                            emotion: 'neutral'
                        }
                    )
                    return;
                }
                if (process.platform === 'win32') {
                    wtts(text);
                    return
                }
                say.speak(text);
            }
        },
        mounted() {
            this.$events.on('say', this.say);
            setTimeout(() => {
                ya.speechkit.settings.apikey = "9137672b-261c-41b7-a933-e548990c9cee";
                this.yatts = new ya.speechkit.Tts({});
            }, 1000);
        }
    }

</script>