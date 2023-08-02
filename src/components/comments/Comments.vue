<script setup>
import CommentForm from './CommentForm.vue';
import CommentsList from './CommentsList.vue'
import Pagination from '../ui/Pagination.vue'
import { storeToRefs } from 'pinia';
import { useCommentsStore } from '../../store/commentsStore';

const commentsStore = useCommentsStore()
const { paginatedComments, comments, maxPage, currentPage } = storeToRefs(commentsStore)
const { setPage } = commentsStore
</script>

<template>
    <CommentForm />
    <Pagination v-if="comments.length" :page="currentPage" :maxPage="maxPage" :totalCount="comments.length" :setPage="setPage" />
    <CommentsList v-if="comments.length > 0" :comments="paginatedComments" />
</template>