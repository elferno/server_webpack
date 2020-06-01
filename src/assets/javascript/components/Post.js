export default class Post {
  constructor(title, logo) {
    this.title = title
    this.logo = logo
    this.date = new Date()
  }

  toString() {
    return JSON.stringify({
      title: this.title,
      logo: this.logo,
      date: this.date.toJSON()
    })
  }

  get uppercaseTitle() {
    return this.title.toUpperCase()
  }
}