import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.0/dist/vue.esm.browser.js'


Vue.component('loader', {
    template:`
    <div style="display: flex; justify-content: center; align-items: center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    `
})

new Vue({ 
    el: '#app', //указываем корневой элемент (el)
    data() {
        return {
            loading: false,
            form: { //у нас два контрола
                name: '', //в файле html связываем поля с помощью v-madel
                value: ''//в файле html связываем поля с помощью v-madel
            },
            contacts: []
        }
    },
    computed: { //запрет на отправку пустых полей
        canCreate() {
            return this.form.value.trim() && this.form.name.trim() //trim - защита от лишних пробелов
        }
    },
    methods: {
        async createContact() {
        const {...contact} = this.form //... - оператор rest

        const newContact = await request('/api/contacts', 'POST', contact)

        this.contacts.push(newContact) //добавляем массив

        this.form.name = this.form.value = '' //очистка полей при перезагрузки
        },
        // markContact(id) {

        // },
        async removeContact(id) {
            await request(`/api/contacts/${id}`, 'DELETE')
            this.contacts = this.contacts.filter(c => c.id !== id) //filter - фильтрует массив в новый; если contact(c)id = id который передали в contact то удаляем этот элемент
        }
    },
    async mounted() {
        this.loading = true
       this.contacts = await request('/api/contacts') //после загрузки loading = false
       this.loading = false
    }
})

async function request(url, method = 'GET', data = null) {
    try {
        const headers = {}
        let body //let потому что нужно будет переопределять str 43

        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await response.json()
    } catch (e) {
        console.warn('Error', e.message)
    }
}