import { reactive } from 'vue';

export const store = reactive({
    apiUrl: "http://127.0.0.1:8000/api/dati",
    operators: [],
    specializations: [],
    reviews: [],
    messages: [],
    sponsorships: [], // correggo sponshorships
    votes: [],
    operator_sponsorships: [], // correggo operator_sponshorships
    operator_specializations: [],/* tabella ponte */
    images: [{}], // E' meglio specificare le immagini qui
    sponsoredOperators: [], // Aggiungi questa riga
});