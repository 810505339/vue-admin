<template>
    <div id="main-wrap">
        <div class="context">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LayMain"
    }
</script>

<style lang="scss" scoped>

    #main-wrap {
        height: calc(100vh - 105px);
        margin: 105px 30px 0 ($NavMenuWidth + 30px);
        -webkit-box-sizing: border-box;
        background: #ffffff;
    }

    .context {
        padding: 30px 0 0 30px;

    }

</style>