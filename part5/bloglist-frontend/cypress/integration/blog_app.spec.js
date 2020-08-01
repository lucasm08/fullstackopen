Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Tobaxxo',
      username: 'bmsr',
      password: 'qwerty',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
    // ...
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('bmsr')
      cy.get('#password').type('qwerty')
      cy.get('#login-button').click()
      cy.contains('Tobaxxo')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'bmsr', password: 'qwerty' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Server Side Redering')
      cy.get('#author').type('Brian Holt')
      cy.get('#url').type(
        'https://btholt.github.io/complete-intro-to-react-v5/ssr'
      )
      cy.contains('create').click()
      cy.contains('Server Side Redering')
    })
  })
})
