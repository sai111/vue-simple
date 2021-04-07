<template>
  <div class="indexDB" />
</template>
<script>
// BrowserHistoryLocalStorage
import { createDBStore } from './config.js'
export default {
  name: 'IndexDB',
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {
    // this.test1()
  },
  methods: {
    async test1() {
      expect(() => {
        createDBStore()
      }).toThrow()
    },
    async testIndexedDB() {
      const options = {
        databaseName: 'test1',
        databaseVersion: 1,
        storeNames: ['test1-1', 'test1-2']
      }
      const db = createDBStore(options)
      await db.set('test1', 'test1-1', 'key1', 'key2')
      // const res = await db.get('test1', 'test1-1', 'key1')
      console.log(db, 'db---00000')
    },
    testLocalStorage() {}
  }
}
</script>
<style lang="scss" scoped>
.indexDB {
  width: 100%;
  height: 100%;
}
</style>
