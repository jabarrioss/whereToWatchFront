import { FlickModel } from '../models/Flick'
import { Http } from '@nativescript/core'

export default class FlickService {
    private flicks: FlickModel[] = []

      async getFlicks(query: string): Promise<FlickModel[]> {
        let url = "https://api.themoviedb.org/3/search/movie?query={QUERY}&api_key=9086abfaefeeab805c380768441f51ed"
        // tranform query to url query params
        query = query.replaceAll(" ", "%20")
        const queryUrl = url.replace("{QUERY}", query)
        console.log("Query url: "+queryUrl)
        this.flicks = await Http.getJSON(queryUrl).then((result: any) => {
          console.log("Response: "+JSON.stringify(result))
          return result.results
        }, (err) => {
          console.log("Error: "+err)
        })
        return this.flicks
      }
    
      async getFlickById(id: number): Promise<FlickModel> {
        let url = `https://api.themoviedb.org/3/movie/${id}?api_key=9086abfaefeeab805c380768441f51ed&append_to_response=watch/providers`
        let flick: FlickModel
        flick = await Http.getJSON(url).then((result: any) => {
            console.log("Response: "+JSON.stringify(result["watch/providers"].results.US.flatrate))
            return result
        }, (err) => {
            console.log("Error: "+err)
        })
        return flick
      }
}