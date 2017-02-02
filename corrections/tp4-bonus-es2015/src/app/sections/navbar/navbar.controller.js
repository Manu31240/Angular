export class NavBarController {

    constructor($location) {
        this.$location = $location
    }

    isActive(path) {
        return this.$location.path().indexOf(path) > -1;
    }
}
