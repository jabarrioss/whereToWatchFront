<template>
    <Page> 
        <ActionBar :title="flick.title" />
        <ScrollView height="100%">
            <StackLayout>
                <Image margin="0" stretch="aspectFill" :src="image_url + flick.poster_path" />
                <StackLayout padding="10 20">
                    <StackLayout>
                        <Label
                        row="1"
                        margin="10 10 0 10"
                        fontWeight="700"
                        class="text-primary"
                        fontSize="18"
                        textWrap="true"
                        :text="streaming_providers"
                        />
                    </StackLayout>
                <Label
                fontSize="14"
                class="text-secondary"
                textWrap="true"
                :text="flick.overview"
                />
                </StackLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'
import FlickService from '../services/FlickService'
import { FlickModel } from '~/models/Flick'

const flickService = new FlickService()

export default Vue.extend({
    props: ['id', 'flick'],
    computed: {
    image_url() {
      const base_url = "https://image.tmdb.org/t/p/w500"
      return base_url
    },
    streaming_providers(){
        let providers = "";
        if(!this.flick['watch/providers'].results.VE.flatrate){
            return "There are no streaming providers for this movie.";
        }
        for (let i = 0; i < this.flick['watch/providers'].results.VE.flatrate.length; i++) {
            providers += this.flick['watch/providers'].results.VE.flatrate[i].provider_name + ", ";
        }
        return providers;
    }
  }
})
</script>