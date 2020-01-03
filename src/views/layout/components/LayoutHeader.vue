<template>
    <div id="header-wrap">
        这是头
    </div>
</template>

<script>
    export default {
        name: "LayHeader"
    }
</script>

<style lang="scss" scoped>

#header-wrap{
    position: fixed;
    height: 75px;
    left: $NavMenuWidth;
    background: #ffffff;
    -webkit-box-shadow: 0 3px 16px 0 rgba(0,0,0,.1);
    right: 0;
    top: 0;
}
</style>