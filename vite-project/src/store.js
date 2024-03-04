import { reactive } from 'vue'

export const store = reactive({
    operators: [],
    specializations: [],
    reviews: [],
    messages: [],
    sponsorships: [], // correggo sponshorships
    votes: [],
    operator_sponsorships: [], // correggo operator_sponshorships
    images: [{}], // E' meglio specificare le immagini qui
})