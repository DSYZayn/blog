export const navbarData = {
  homeTitle: "Zayn's Blog",
}

export const footerData = {
  author: 'Chen Xingyu',
  aboutAuthor:
    'Hi! I am Chen Xingyu, a Tech enthusiast, problem solver and software engineer. Currently finishing my bachelor\'s degree in Geographic Information Science.',
  authorInterest:
    "I have a fair amount of knowledge of Javascript, Typescript, VueJs, and Nuxt. If you have an interesting idea, either open source or paid let's connect.",
  aboutTheSite:
    "This is a personal blog site built with Nuxt3, TailwindCSS, NuxtContent, Nuxt Icon. Currently it's deployed in Vercel.",
}

export const homePage = {
  title: 'Welcome To My Blog Site',
  description:
    'Get Web Development, Javascript, Typescript, NodeJs, Vue, and Nuxt, Related Articles, Tips, Learning resources and more.',
}

export const blogsPage = {
  title: 'All Blogs',
  description: 'Here you will find all the blog posts I have written & published on this site.',
}

export const categoryPage = {
  title: 'Categories',
  description:
    'Blow this category is generated from all the tags are mentioned in the different blog post',
}

export const aboutPage = {
  title: 'Chen Xingyu',
  description: 'Software Engineer, Problem Solver, Web Developer, ML Enthusiast.',
  aboutMe:
    "Hi! I'm an undergraduate student in the field of Geographic Information Science. I have a fair amount of knowledge of web, hpc, maintenance and machine learning. If you have an interesting idea, either open source or paid let's connect.",
}

export const seoData = {
  title: `Zayn's Blog | Zayn Blog`,
  ogTitle: `Let's learn Javascript, Typescript, Vue, Nuxt, & Problem Solving - Zayn Blog | Zayn's Blog`,
  description: `Hi I am Zayn. A student working on big geo data, with over 2.5+ years experience in software development. - Zayn Blog | Zayn's Blog`,
  twitterDescription: `Zayn's Blog, where I play around with Nuxt, Vue, and more and showcase my blog, resources, etc - Zayn Blog | Zayn's Blog`,
  image:
    'https://res.cloudinary.com/dmecmyphj/image/upload/v1673548905/nuxt-blog/cover_ntgs6u.webp',
  mySite: 'https://blog.dongsy.com.cn',
  twitterHandle: '',
  mailAddress: 'dong030202@gmail.com',
}

export const socialLinks = {
  githubLink: 'https://github.com/DSYZayn',
}

export const siteMetaData = [
  {
    name: 'description',
    content: seoData.description,
  },
  // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
  { property: 'og:site_name', content: seoData.mySite },
  { property: 'og:type', content: 'website' },
  {
    property: 'og:url',
    content: seoData.mySite,
  },
  {
    property: 'og:title',
    content: seoData.ogTitle,
  },
  {
    property: 'og:description',
    content: seoData.description,
  },
  {
    property: 'og:image',
    content: seoData.image,
  },
  // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
  { name: 'twitter:site', content: seoData.twitterHandle },
  { name: 'twitter:card', content: 'summary_large_image' },
  {
    name: 'twitter:url',
    content: seoData.mySite,
  },
  {
    name: 'twitter:title',
    content: seoData.ogTitle,
  },
  {
    name: 'twitter:description',
    content: seoData.twitterDescription,
  },
  {
    name: 'twitter:image',
    content: seoData.image,
  },
]
