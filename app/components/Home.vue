<!-- app/components/Home.vue -->
<template>
  <Page>
    <ActionBar title="WhereToWatch" />
    <StackLayout class="home-panel">
        <TabView :selectedIndex="selectedIndex" @selectedIndexChange="indexChange">
      <TabViewItem iconSource="~/images/movie-symbol-of-video-camera_icon-icons.com_72981.png" title="Search Movies" class="fas">
        <StackLayout>
          <SearchBar
          hint="Type a movie title"
          :text="searchPhrase"
          @submit="onSubmit"
          v-model="searchPhrase"
          verticalAlignment="top"
          height="10%"
          />
        </StackLayout>
      </TabViewItem>
      <!-- <TabViewItem title="Tab 2">
        <label text="Content for Tab 2" />
      </TabViewItem> -->
    </TabView>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'
import FlickService from '../services/FlickService'
import Details from './Details.vue'
import { FlickModel } from '~/models/Flick'

const flickService = new FlickService()
export default Vue.extend({
  data() {
    return {
      flicks: [] as FlickModel[],
      searchPhrase: '',
      selectedIndex: 0,
      tab1_icon: "\uf03d",
    }
  },
  methods: {
    async onFlickTap(args: any) {
      const id = args.item.id
      const flick = await flickService.getFlickById(id)

      this.$navigateTo(Details, {
        props: {
          id,
          flick
        }
      })
      console.log("Flick id: "+id)
    },
    async onSubmit(args: any) {
      this.flicks = await flickService.getFlicks(args.object.text)
      this.searchPhrase = ""
    },
    indexChange(args: any){
      console.log("Selected index: " + args.value);
    }
  },

})
</script>