<template >
    <div id="light-elem">
        <div class="elem" :class="{active: isActive}" :style="{'background-color':color}">
         
        </div>
    </div>
</template>
<script>

export default {
    props:{
        isActive:{
            type:Boolean,
            default:true
        },
        color:{
            type:String,
            default:""
        }
    },
    name:'light-elem',
    data(){
        return {
          
        }
    }
}
</script>
<style lang="scss" src="./light-elem.scss"></style>