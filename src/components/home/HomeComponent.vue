<script lang="ts">
    import { defineComponent, toRefs } from 'vue';
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    import { useRouter } from 'vue-router';
    import LoadFile from './LoadFile.vue';
    import Navbar from './NavbarComponent.vue';
    import useAppStore from '../../store/appStore';
    
    export default defineComponent({
        name: 'HomeComponent',
        components: {
            LoadFile,
            Navbar
        },
        beforeMount() {
            const auth = getAuth();
            const router = useRouter();
            const appStore = useAppStore();
            const { user, savedProjects } = toRefs(appStore); 
            onAuthStateChanged(auth, (userState) => {
                if (!userState) {
                    router.push('/login')
                } else {
                    router.push('/');
                    const endpoint = import.meta.env.VITE_API_ENDPOINT;
                    fetch(`${endpoint}/project?userId=${userState.uid}`)
                        .then((res) => res.json())
                        .then((res) => savedProjects.value = res.response)
                }
                user.value = userState;
            })
        },
        setup() {
            const appStore = useAppStore();
            const { user } = toRefs(appStore);
            return { user };
        }
    })
</script>

<template>
    <Navbar />
    <LoadFile />
</template>

<style scoped>
    .root {
        width: 50%;
        position: relative;
        left: 25%;
        height: 50vh;
    }
</style>
