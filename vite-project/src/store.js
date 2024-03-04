import { reactive } from 'vue'

export const store = reactive({
    apiUrl:""
    operators: [],
    specializations: [],
    reviews: [],
    messages: [],
    sponsorships: [], // correggo sponshorships
    votes: [],
    operator_sponsorships: [], // correggo operator_sponshorships
    operator_specializations: [],
    images: [{}], // E' meglio specificare le immagini qui
})