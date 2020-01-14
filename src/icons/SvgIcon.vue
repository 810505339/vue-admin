<template>
        <svg :class="svgClass"  :aria-hidden="true">
            <use :xlink:href="iconName"></use>
        </svg>
</template>

<script>
    import {computed, ref,watch} from "@vue/composition-api";
    export default {
        name: "SvgIcon",
      // props:['className','iconClass'],
        props:{
            className:{
                type:String,
                default:'',
            },
            iconClass:{
                type:String,
                default:'',
                require:true   //必填项
            },
        },
        setup(props){

            const iconName=computed(()=> `#icon-${props.iconClass}`)
            const svgClass=computed(()=>{
                if(props.className)
                {
                    return `svg-icon ${props.className}`
                }
                else
                {
                    return `svg-icon`
                }

            })

            return{
                iconName,
                svgClass

            }


        }
    }
</script>

<style lang="scss" scoped>
    .svg-icon{

        width: 1em;
        height: 1em;
      /*设置颜色
      */


    }

</style>