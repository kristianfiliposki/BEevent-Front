import {reactive} from 'vue'
export const store=reactive({
    data(){
        return{
            operators :[],
            specializations:[],
            reviews:[],
            messages:[],
            sponshorships:[],
            votes:[],
            operator_sponshorship:[],
            images:[
                {

                },
            ],
        }
    },
})