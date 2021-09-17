const blog = {
  title: 'test title',
  author: 'manu',
  url: 'https://fullstackopen.com/en/part5/end_to_end_testing#testing-new-note-form'
}
const blogs = [{
  title: 'title1',
  author: 'me',
  url: 'http://title1.com',
},
{
  title: 'title2',
  author: 'me2',
  url: 'http://title2.com',
},
{
  title: 'title3',
  author: 'me3',
  url: 'http://title3.com',
}]
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'amanuel97',
      username: 'manu',
      password: 'Manu123@'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
    cy.contains('cancel')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('manu')
      cy.get('#password').type('Manu123@')
      cy.get('#login-button').click()

      cy.contains('manu logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('manu')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

        .get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'border-style', 'solid')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'manu', password: 'Manu123@' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#create-blog').click()
      cy.contains(`${blog.title} ${blog.author}`)
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: blog.title,
          author: blog.author,
          url:blog.url
        })
      })

      it('user can like a blog', function () {
        cy.contains('view').click()
        cy.contains('likes: 0')

        cy.get('.like-button').click()
        cy.contains('likes: 1')
      })

      it('blog owner can delete own blog', function () {
        cy.contains('view').click()
        cy.get('#delete-button').click()
        cy.on('windows:confirm', () => true)

        cy.get('.success')
          .should('contain', `blog ${blog.title} was deleted`)
          .and('have.css', 'color', 'rgb(0, 128, 0)')
        cy.get('.page-content').should('not.contain', `${blog.title} ${blog.author}`)

      })

      describe('user cannot delete others blog', function () {
        beforeEach(function () {
          cy.request('POST', 'http://localhost:3003/api/users/', {
            username: 'secondUser',
            name: 'user2',
            password: 'cantdeleteBlog',
          })
          cy.login({ username: 'secondUser', password: 'cantdeleteBlog' })
        })

        it('delete button not visible to non-owner', function () {
          cy.contains('view').click()
          cy.get('.page-content').should('not.contain', 'delete')
        })
      })
    })

    describe('check like order', function () {
      beforeEach(function () {
        cy.createBlog(blogs[0])
        cy.createBlog(blogs[1])
        cy.createBlog(blogs[2])
      })

      it('likes are in descending order', function () {
        // expand every bloglist
        cy.get('.toggle').each(($el) => {
          cy.wrap($el).click()
        })
        // like evey blog based on list index + 1
        cy.get('.like-button').each(($btn, index) => {
          for(let n=0; n<=index; n++){
            cy.wrap($btn).click()
            cy.wait(index)
          }
        })
        //check blogs are ordered according to likes 3-2-1
        cy.get('.likecount').each(($p, index) => {
          cy.wrap($p).contains(`likes: ${blogs.length-index}`)
        })
      })
    })
  })

})