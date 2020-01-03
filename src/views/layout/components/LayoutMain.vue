<template>
    <div id="main-wrap">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: "LayMain"
    }
</script>

<style lang="scss" scoped>

#main-wrap{
    height: calc(100vh - 105px);
    margin: 105px 30px 0 ($NavMenuWidth + 30px);
    -webkit-box-sizing: border-box;
    background: #ffffff;
}
</style>