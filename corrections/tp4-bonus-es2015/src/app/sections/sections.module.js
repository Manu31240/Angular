import angular from '../../../node_modules/angular'
import angularRoute from '../../../node_modules/angular-route'
import CoreModule from '../core'
import SectionsRoutes from './sections.routes'
import ContactListController from './list'
import ContactEditController from './edit'
import NavbarController from './navbar'

const name = 'zenContact.sections'
angular.module(name, [
        angularRoute,
        CoreModule,
    ])
    .config(SectionsRoutes)
    .controller(ContactListController.name, ContactListController)
    .controller(ContactEditController.name, ContactEditController)
    .controller(NavbarController.name, NavbarController)

export default name
