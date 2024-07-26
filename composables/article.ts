export const useArticle = () => {
    return useState<boolean>('article', () => {
        const route = useRoute()

        const isArticlePage = ref<boolean>(false)
        watch(() => route.name, (name) => {
            isArticlePage.value = name == 'articles-slug' ? true : false
        }, {
            immediate: true
        })

        return isArticlePage
    })
}