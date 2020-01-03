<template>
<div id="layout">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
</div>
</template>

<script>
    import LayoutHeader from "views/layout/components/LayoutHeader"
    import LayoutMain from "views/layout/components/LayoutMain"
    import LayoutNav from "views/layout/components/LayoutNav"
    export default {
        name: "index",
        components:{
            LayoutHeader,
            LayoutMain,
            LayoutNav
        },
        setup(){

        },

    }
</script>

<style lang="scss" scoped>
#layout{
    background: #f7f7f7;
}

</style>