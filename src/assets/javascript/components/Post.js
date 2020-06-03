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
    }, null, 2)
  }

  get uppercaseTitle() {
    return this.title.toUpperCase()
  }
}