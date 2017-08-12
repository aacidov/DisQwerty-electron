<template>
    <h1 class="out">
        <span>{{content}}</span>
        <span class="cursor">|</span>
    </h1>
</template>

<script>

var data = {
            content: ""
        };

module.exports = {
    data: function () {
        return data;
    },
    methods: {
        input: function (content) {
            switch (content) {
                case "^":

                    break;
                case "<-":
                    this.backspace();
                    break;
                case "<=":
                    this.backword();
                    break;
                case "##":
                    this.clear();
                    break;
                case "@@":
                    this.say();
                    break;
                    case 'vkpublish':
                    this.$events.emit('vkpublish')
                    break;
                default:
                    this.content += content;
                    break;

            }
            this.$events.emit('newContent', this.content);
        },
        clear: function () {
            this.content = "";
            this.$events.emit('newContent', this.content);

        },
        backspace: function () {
            this.content = this.content.slice(0, -1);
            this.$events.emit('newContent', this.content);

        },
        backword: function () {
            this.content = this.content.slice(0, this.content.lastIndexOf(" "));
            this.$events.emit('newContent', this.content);

        },
        say: function () {
            this.$events.emit('say', this.content);
        }
    },
    mounted() {
        this.$events.on('input', this.input);
        this.$events.on('clear', this.clear);
        this.$events.on('backspace', this.backspace);
        this.$events.on('backword', this.backword);
    }
};
module.exports.store = data;
</script>

<style>
@keyframes blinkin {
    0% {
        color: black;
    }
    50% {
        color: white;
    }
    100% {
        color: black;
    }
}

.cursor {
    animation-duration: 1s;
    animation-name: blinkin;

    animation-iteration-count: infinite;
    margin: 0;
}

.out {
    border: 1px solid black;
}
</style>