export class ContactListController {

    constructor(ContactService) {
        this.ContactService = ContactService
        this.canActivate()
    }

    canActivate() {
        this.contacts = this.ContactService.getAllContacts()
    }
}
