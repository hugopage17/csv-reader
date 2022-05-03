<script lang="ts">
    import { defineComponent, toRefs } from 'vue';
    import { NAvatar, NDivider } from 'naive-ui';
    import useAppStore from '../../store/appStore';
    
    export default defineComponent({
        name: 'NavbarComponent',
        components: {
            NAvatar,
            NDivider
        },
        setup() {
            const appStore = useAppStore();
            const { user } = toRefs(appStore);
            return { user };
        }
    })
</script>

<template>
    <NAvatar
        :src="(user?.photoURL as string)"
        size="large"
        round
    />
    <NDivider />
</template>

