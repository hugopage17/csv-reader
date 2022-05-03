<script lang="ts">
    import { defineComponent } from 'vue';
    import { NCard, NButton } from 'naive-ui';
    import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

    export default defineComponent({
        name: 'LoginComponent',
        components: { NCard, NButton },
        methods: {
            async googleLogin() {
                const provider = new GoogleAuthProvider();
                const auth = getAuth();
                await signInWithPopup(auth, provider);
            }
        }
    })
</script>

<template>
    <NCard>
        <NButton>Login with Facebook</NButton>
        <NButton @click="googleLogin">Login with Google</NButton>
    </NCard>
</template>