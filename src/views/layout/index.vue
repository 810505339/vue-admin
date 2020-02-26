<template>
    <div id="layout" :class="[isCollapse?'close':'open']">
        <LayoutHeader/>
        <LayoutMain/>
        <LayoutNav/>

    </div>
</template>

<script>
    import LayoutHeader from "views/layout/components/LayoutHeader"
    import LayoutMain from "views/layout/components/LayoutMain"
    import LayoutNav from "views/layout/components/LayoutNav"
    import {computed} from "@vue/composition-api";

    export default {
        name: "index",
        components: {
            LayoutHeader,
            LayoutMain,
            LayoutNav
        },
        setup(props, {root}) {
            const isCollapse = computed(() => {
                console.log(root.$store.state)
                return root.$store.state.app.isCollapse
            });

            return {
                isCollapse,
            }
        },

    }
</script>

<style lang="scss" scoped>
    #layout {
        background: #f7f7f7;
    }

</style>