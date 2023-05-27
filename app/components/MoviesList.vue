<template>
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
</template>

<script lang="ts">
import Vue from 'nativescript-vue'
import FlickService from '../services/FlickService'
import { FlickModel } from '~/models/Flick'
export default Vue.extend({
  props: ['flicks'],
  computed: {
    image_url() {
      const base_url = "https://image.tmdb.org/t/p/w500"
      return base_url
    }
  }
})
</script>