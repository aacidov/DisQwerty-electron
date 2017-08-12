<script>
    var rw = require('./row')
    var predict = Vue.extend(rw, {
        data () {
            return {
                row:['test']
            }
        }
    });
    
    module.exports=predict;

</script>