export class ContactEditController {

    constructor($routeParams, ContactService) {
        this.ContactService = ContactService
        this.$routeParams = $routeParams
        this.canActivate()
    }

    canActivate() {
        this.contact = this.ContactService.getContactById(parseInt(this.$routeParams.id))
    }
}
