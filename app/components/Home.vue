<!-- app/components/Home.vue -->
<template>
  <Page>
    <ActionBar title="WhereToWatch" />
    <StackLayout class="home-panel">
      <SearchBar
        hint="Type a movie title"
        :text="searchPhrase"
        @submit="onSubmit"
        v-model="searchPhrase"
        verticalAlignment="top"
        height="10%"
      />
      <ListView height="90%" separatorColor="transparent" for="item in flicks" @itemTap="onFlickTap">
        <v-template>
          <GridLayout
            height="280"
            borderRadius="10"
            class="bg-secondary"
            rows="*, auto, auto"
            columns="*"
            margin="5 10"
            padding="0"
          >
            <Image
              row="0"
              margin="0"
              stretch="aspectFill"
              :src="image_url + item.poster_path"
            />
            <label
              row="1"
              margin="10 10 0 10"
              fontWeight="700"
              class="text-primary"
              fontSize="18"
              :text="item.title"
            />
            <label
              row="2"
              margin="0 10 10 10"
              class="text-secondary"
              fontSize="14"
              textWrap="true"
              :text="item.overview"
            />
          </GridLayout>
        </v-template>
      </ListView>
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
      searchPhrase: ''
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
  },
  computed: {
    image_url() {
      const base_url = "https://image.tmdb.org/t/p/w500"
      return base_url
    }
  }
})
</script>