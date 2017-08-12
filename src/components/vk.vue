<template>
  <div class="form-group">
        <h4>Настройки интеграции с vk.com</h4>
                <button type="button" v-if="this.token == null" class="btn btn-default"  @click="login">Войти в VK</button>
                <button type="button" v-else class="btn btn-default"  @click="publish">Опубликовать в VK</button>
                <button type="button" v-if ="this.name!=null" class="btn btn-default btn-disabled" >Вы вошли как {{this.name}}</button>
                
     </div>
</template>

<script>
const OAuthVK = require('electron-oauth-vk');

const vk = require('api.vk.com');

const out = require('./out');

const oauth = new OAuthVK(require('electron').remote.BrowserWindow, {clientID: 6146385, scope:['wall', 'offline']})

var store = {
            token: window.localStorage.token || null,
            name: null
        };

module.exports={
    data(){
        return store;
    },
    watch: {
        token(v){
            return window.localStorage.token=v;
        }
    },
    methods: {
        login(){
            oauth.login().then((data)=>{
                if (data.access_token==null) return;
                this.token = data.access_token;
                this.getName();       
            })
        },
        publish(){
        if (this.token==null) return;
            
            let message = (out.store.content);
            vk('wall.post', {access_token:this.token, message}, (err, res)=>{
                console.log(err, res);
            });            
        },
        getName(){

        if (this.token==null) return;
            
            vk('users.get', {access_token:this.token}, (err, res)=>{
                
                if (err||res.length==0) return;
                this.name = res[0].first_name+' '+res[0].last_name;
            })
        
        }
    },
    mounted() {
        this.getName();
        this.$events.on('vkpublish', this.publish);
    }
}
module.exports.store = store;
</script>
