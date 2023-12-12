export default defineEventHandler((event) => {
    handleCors(event, {
        origin: [
            'http://localhost:3000',
            'http://localhost:5500',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:5500'
        ],
        methods: '*',
    })
})