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
    @import "@/styles/config.scss";
    #main-wrap {
        height: calc(100vh - 105px);
        margin: 105px 30px 0 ($NavMenuWidth + 30px);
        -webkit-box-sizing: border-box;
        background: #ffffff;
        @include webkit(transition, all 1s ease-out 0s);
    }

    .context {
        padding: 30px;

    }
    .close{
        #main-wrap {
            margin-left:($closeWidth+ 30px);
        }
    }
    .open{
        #main-wrap {
            margin-left:($NavMenuWidth + 30px) ;
        }
    }

</style>