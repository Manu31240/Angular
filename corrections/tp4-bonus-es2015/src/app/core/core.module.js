import angular from '../../../node_modules/angular'
import ContactService from './contact'

const name = 'zenContact.core'
angular.module(name, [])
    .service(ContactService.name, ContactService)

export default name
