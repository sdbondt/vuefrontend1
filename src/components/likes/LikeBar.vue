<script setup>
import Button from '../ui/Button.vue';
const { length, buttonValue } = defineProps(['length', 'buttonValue'])
const emit = defineEmits(['like'])

const handleLike = () => {
    emit('like')
}
</script>

<template>
    <div>
        <Button @click="handleLike">{{ buttonValue }}</Button>
        <p class="inline-block text-sm italic">{{ length }} {{ length == 1 ? 'Like': 'Likes' }}</p>
    </div>  
</template>