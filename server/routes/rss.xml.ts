// server/routes/rss.xml.ts
import { Feed } from 'feed'

const basePath = 'https://blog.dongsy.com.cn'

export default defineEventHandler(async (event) => {
    setHeader(event, 'content-type', 'text/xml')
    const docs = await queryCollection(event, 'blogs').order('date', 'DESC').all()

    const feed = new Feed({
        title: "Zayn's personal blog site",
        description: "Zayn's personal blog site",
        id: basePath,
        link: basePath,
        language: 'zh',
        favicon: `${basePath}/favicon.ico`,
        copyright: 'MIT',
        author: {
            name: 'Chen Xingyu',
            email: 'dong030202@gmail.com',
            link: basePath,
        },
    })

    // Add the feed items
    docs.forEach((doc) => {
        feed.addItem({
            title: doc.title || '',
            id: basePath + doc.path,
            link: basePath + doc.path,
            description: doc.description,
            content: doc.description,
            date: new Date(doc.date as string),
        })
    })

    return feed.rss2()
})