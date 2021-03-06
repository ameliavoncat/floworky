const express = require( 'express' )
const router = express.Router()

const findUser = require( '../../../auth/comparePassword' )
const authenticate = require( '../../accounts/authenticate' )
const register = require( '../../accounts/register' )
const validateEmail = require( '../../../src/mail/validate_email' )

router.post( '/register', ( request, response ) => {
  const { User } = request.app.get( 'models' )
  const { email, password } =request.body

  validateEmail( email )
    .then( validEmail => register( User, validEmail, password ) )
    .then( user => response.status( 201 ).json({}) )
    .catch( error => response.status( 500 ).json({}) )
})

router.post( '/authenticate', ( request, response ) => {
  const { User } = request.app.get( 'models' )
  const { email, password } = request.body

  findUser( User, email, password )
    .then( user => authenticate( user ) )
    .then( token => response.status( 200 ).json({ token }))
    .catch( error => response.status( 500 ).json({ error }))
})

module.exports = router
