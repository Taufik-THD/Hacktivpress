<template>
  <div class="home">
    <AddArticle />
    <Header/>
  </div>
</template>

<script>
// @ is an alias to /src
import AddArticle from '@/components/AddArticle.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'add',
  components: {
    AddArticle,
    Header
  }
}
</script>
