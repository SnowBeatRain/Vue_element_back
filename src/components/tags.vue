<template>
  <div class="tags-wrapper" v-if="showTags">
    <ul>
      <li class="tags-li" v-for="(item,index) in $store.state.tagList" :key="index" :class="{'active': isActive(item.path,item.title)}">
        <router-link class="tags-li-title" :to="item.path">{{item.title}}</router-link>
        <span class="tags-li-icon"  @click="closeTags(index,item.title)"><i class="el-icon-close"></i></span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Tags',
  data () {
    return {
      tagsList: []
    }
  },
  methods: {
    isActive (path,title) {
      return path === this.$route.path || title === this.$route.name
    },
    //设置标签
    setTags (route) {
      var isHome = false
      const isExist = this.$store.state.tagList.some(item => {
        return item.path === route.path
      })
      const isSameName = this.$store.state.tagList.some(item=>{
        if(item.title === route.name){
          item.path = route.path
          return true
        }
      })
      if(route.path === '/'){
        isHome = true
      }
      !isExist && !isHome && !isSameName && this.tagsList.push({
        title: route.name,
        path: route.path
      })
      this.$store.commit('newTagList',this.tagsList)
    },
    //关闭标签
    closeTags (index,title) {
      const delItem = this.tagsList.splice(index,1)[0]
      const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1]
      if (item) {
        delItem.path === this.$route.path && this.$router.push(item.path)
      }else{
        this.$router.push('/')
      }
      this.$store.commit('newTagList',this.tagsList)
    }
  },
  computed: {
    showTags () {
      return this.$store.state.tagList.length > 0
    }
  },
  created () {
    this.setTags(this.$route)
  },
  watch: {
    $route(newValue, oldValue){
      this.setTags(newValue)
    }
  }

}
</script>
<style lang="stylus">
.tags-wrapper
  width 100%
  height 30px
  overflow hidden
  background #ffffff
  padding 10px 0
  ul
    box-sizing border-box
    width 100%
    height 100%
    .tags-li
      float left
      height 23px
      line-height 23px
      font-size 12px
      border 1px solid #e9eaec
      border-radius 4px
      margin 3px 5px 2px 3px
      padding 0 5px 0 12px
      transition all .3s ease-in
      &:not(.active):hover
        background #f8f8f8
      &.active
        border-color #409EFF
        background #409EFF
        .tags-li-title
          color #fff
        .tags-li-icon
          color #fff
      .tags-li-title
        max-width 80px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        margin-right 5px
        color #666
      .tags-li-icon
        cursor pointer
</style>

