export interface FlickModel {
    id: number
    title: string
    overview: string
    poster_path: string
    "watch/providers": {
        results: {
            VE: {
                link: string
                flatrate: {
                    provider_name: string
                    logo_path: string
                }[]
              }
            }
          }
}